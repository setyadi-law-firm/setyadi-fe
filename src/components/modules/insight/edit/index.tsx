"use client";

import { useParams, useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import { useState, useRef, useEffect } from "react";
import DOMPurify from "isomorphic-dompurify";
import "@/components/core/styles/article-content.css";
import { toast } from "sonner";

// Shadcn UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Icons
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Code,
  Heading2,
  Heading3,
  ArrowLeft,
  Save,
  Image as ImageIcon,
} from "lucide-react";
import { ENDPOINTS, useSetyadiClient } from "@/components/core";

export function InsightEditPageModule() {
  const { id } = useParams<{
    id: string;
  }>();
  const router = useRouter();
  const setyadiClient = useSetyadiClient();

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [date, setDate] = useState<{
    day: string;
    month: string;
    year: string;
  }>({
    day: "",
    month: "",
    year: "",
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState<string>(""); // Store as HTML
  // Initialize TipTap editor with proper extensions
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Underline, // Add the underline extension
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setHasUnsavedChanges(true);
      // Store both HTML and JSON formats
      setEditorContent(editor.getHTML());
    },
  });

  // Image upload handler
  const handleMainImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const loadingToast = toast.loading("Uploading main image...");
      try {
        // Show loading indicator

        // Upload the image to the server
        const formData = new FormData();
        formData.append("file", file);

        const response = await setyadiClient.post(
          ENDPOINTS.UPLOAD_IMAGE,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // If successful, use the image URL from the server
        if (response.data.data?.url) {
          setMainImage(response.data.data.url);
          setHasUnsavedChanges(true);
          toast.dismiss(loadingToast);
          toast.success("Main image uploaded successfully");
        } else {
          // If server doesn't return a URL, show error and don't set the image
          toast.dismiss(loadingToast);
          toast.error("Main image upload failed: No URL returned from server");

          // Reset the file input
          if (mainImageInputRef.current) {
            mainImageInputRef.current.value = "";
          }
        }
      } catch (error) {
        toast.dismiss(loadingToast);
        console.error("Error uploading main image:", error);
        toast.error("Failed to upload main image. Please try again later.");

        // Reset the file input
        if (mainImageInputRef.current) {
          mainImageInputRef.current.value = "";
        }
      }
    }
  }; // Handle inline image upload for editor
  const handleInlineImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file && editor) {
      const loadingToast = toast.loading("Uploading image...");
      try {
        // Show loading indicator

        // First upload the image to the server
        const formData = new FormData();
        formData.append("file", file);

        const response = await setyadiClient.post(
          ENDPOINTS.UPLOAD_IMAGE,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // If successful, insert the image URL from the server into the editor
        if (response.data.data?.url) {
          // Insert the image with the URL from the server
          editor
            .chain()
            .focus()
            .setImage({
              src: response.data.data.url,
              alt: file.name || "Article image",
            })
            .run();

          setHasUnsavedChanges(true);
          toast.dismiss(loadingToast);
          toast.success("Image uploaded successfully");
        } else {
          // If server doesn't return a URL, show error and do not insert the image
          toast.dismiss(loadingToast);
          toast.error("Image upload failed: No URL returned from server");

          // Reset the file input
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.dismiss(loadingToast);
        toast.error("Failed to upload image. Please try again later.");

        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  // Form change handlers
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleDateChange = (key: "day" | "month" | "year", value: string) => {
    setDate((prev) => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  // Navigation and save handlers
  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedDialog(true);
    } else {
      router.back();
    }
  };

  const confirmDiscard = () => {
    setShowUnsavedDialog(false);
    router.push("/insights");
  };
  const confirmSave = async () => {
    try {
      // Sanitize the HTML content before sending to server
      const sanitizedContent = DOMPurify.sanitize(editorContent);

      // Prepare the data to send to backend
      const articleData = {
        title,
        content: sanitizedContent,
        author,
        image_url: mainImage,
      };

      let response;
      const loadingToast = toast.loading(
        `${id ? "Updating" : "Creating"} article...`
      );

      // Use PUT for updates and POST for new articles
      if (id) {
        // Update existing article with PUT request
        response = await setyadiClient.put(
          `${ENDPOINTS.ARTICLE}/${id}`,
          articleData
        );
      } else {
        // Create new article with POST request
        response = await setyadiClient.post(ENDPOINTS.ARTICLE, articleData);
      }

      toast.dismiss(loadingToast);
      toast.success(`Article ${id ? "updated" : "created"} successfully`);
      setHasUnsavedChanges(false);
      setShowSaveDialog(false);

      // Redirect to the insights list or the detail page
      if (id) {
        router.push(`/insights/${id}`);
      } else if (response.data?.id) {
        router.push(`/insights/${response.data.id}`);
      } else {
        router.push("/insights");
      }
    } catch (error) {
      console.error("Error saving article:", error);
      toast.error(
        `Failed to ${id ? "update" : "create"} article. Please try again.`
      );
      setShowSaveDialog(false);
    }
  };
  // Function to initialize editor with existing content (for edit mode)
  const loadExistingContent = async (articleId: string) => {
    try {
      const loadingToast = toast.loading("Loading article...");

      // Fetch article data from the API
      const response = await setyadiClient.get(
        `${ENDPOINTS.ARTICLE}/${articleId}`
      );

      // The API response structure is directly the article object
      const article = response.data;

      toast.dismiss(loadingToast);

      // If no data is returned, show error
      if (!article) {
        toast.error("Failed to load article data");
        return;
      }

      // Update form fields with article data
      setTitle(article.title || "");
      setAuthor(article.author || "");
      setMainImage(article.image_url || null);

      // Set created_at date if available
      if (article.created_at) {
        const date = new Date(article.created_at);
        setDate({
          year: date.getFullYear().toString(),
          month: (date.getMonth() + 1).toString().padStart(2, "0"),
          day: date.getDate().toString().padStart(2, "0"),
        });
      }

      // Set editor content if editor is ready
      if (editor && article.content) {
        editor.commands.setContent(article.content);
        setEditorContent(article.content);
      }

      toast.success("Article loaded successfully");
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Failed to load article:", error);
      toast.error("Failed to load article. Please try again.");
    }
  };

  // Effect to load existing content when in edit mode
  useEffect(() => {
    if (id && editor) {
      loadExistingContent(id);
    }
  }, [id, editor]);

  return (
    <div className="container mx-auto p-4 max-w-6xl mt-20">
      {/* Header/Navigation */}
      <Button
        variant="default"
        className="mb-6 rounded-md w-16 py-2"
        onClick={handleBack}
      >
        <ArrowLeft size={16} />
      </Button>{" "}
      <div className="w-full relative -z-10 md:pb-4 mt-4 mb-8">
        <div className="border-l-4 md:py-3 py-1 md:pl-6 pl-3 border-[#1059BD] text-neutral-950 font-semibold text-lg md:text-2xl">
          {id ? "Update Article" : "Create Article"}
        </div>
      </div>
      {/* Main Image Upload */}
      <Label className="mb-2">Upload Image</Label>
      <div
        className={`relative border-2 border-dashed border-gray-300 rounded-md p-6 mb-6 h-40 flex flex-col items-center justify-center cursor-pointer ${
          mainImage ? "bg-gray-50" : ""
        }`}
        onClick={() => mainImageInputRef.current?.click()}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleMainImageUpload}
          ref={mainImageInputRef}
          id="main-image-upload"
        />

        {mainImage ? (
          <div className="relative w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mainImage}
              alt="Main image preview"
              className="w-full h-full object-contain"
            />
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 bg-white"
              onClick={(e) => {
                e.stopPropagation();
                setMainImage(null);
              }}
            >
              Change
            </Button>
          </div>
        ) : (
          <>
            <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 text-center">
              Please select your file here, Max Size 5 MB
            </p>
          </>
        )}
      </div>
      {/* Form Fields */}
      <div className="space-y-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Type here"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            placeholder="Type here"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>

        {/* <div className="space-y-2">
          <Label>Date</Label>
          <div className="flex gap-2 w-fit items-center">
            <Input
              placeholder="DD"
              value={date.day}
              onChange={(e) => handleDateChange("day", e.target.value)}
              maxLength={2}
              className="w-20"
            />
            <p>/</p>
            <Input
              placeholder="MM"
              value={date.month}
              onChange={(e) => handleDateChange("month", e.target.value)}
              maxLength={2}
              className="w-20"
            />
            <p>/</p>
            <Input
              placeholder="YYYY"
              value={date.year}
              onChange={(e) => handleDateChange("year", e.target.value)}
              maxLength={4}
              className="w-28"
            />
          </div>
        </div> */}
      </div>
      {/* Rich Text Editor */}
      <div className="mb-6">
        <Label htmlFor="content" className="block mb-2">
          Text Input
        </Label>
        {/* Editor Menu */}
        <div className="flex flex-wrap gap-1 mb-2 border rounded-md p-1">
          <Button
            type="button"
            variant={
              editor?.isActive("heading", { level: 2 }) ? "default" : "ghost"
            }
            size="sm"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={
              editor?.isActive("heading", { level: 3 }) ? "default" : "ghost"
            }
            size="sm"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor?.isActive("bold") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor?.isActive("italic") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor?.isActive("underline") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor?.isActive("bulletList") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor?.isActive("orderedList") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>{" "}
          <Button
            type="button"
            variant={editor?.isActive("codeBlock") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          >
            <Code className="h-4 w-4" />
          </Button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInlineImageUpload}
            ref={fileInputRef}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
        {/* Editor Content with improved styling for lists */}
        <div className="border rounded-md p-4 min-h-[300px] prose-sm max-w-none">
          <EditorContent editor={editor} />
        </div>{" "}
      </div>
      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <Button type="button" onClick={() => setShowSaveDialog(true)}>
          <Save className="mr-2 h-4 w-4" /> Save
        </Button>
      </div>
      {/* Unsaved Changes Dialog */}
      <Dialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription>
              You have unsaved changes, are you sure you want to leave? If you
              leave, your changes will be discarded.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between sm:justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowUnsavedDialog(false)}
            >
              Back
            </Button>
            <Button variant="destructive" onClick={confirmDiscard}>
              Leave
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Save Article Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Article</DialogTitle>
            <DialogDescription>
              Are you sure you want to save this article? You can edit it later
              if needed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" onClick={confirmSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>{" "}
      <style jsx global>{`
        /* Editor styles */
        .ProseMirror p {
          margin: 1em 0;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 1em 0;
        }
        .ProseMirror ul {
          list-style-type: disc;
        }
        .ProseMirror ol {
          list-style-type: decimal;
        }
        .ProseMirror li {
          margin-bottom: 0.5em;
        }
        .ProseMirror strong {
          font-weight: bold;
        }
        .ProseMirror em {
          font-style: italic;
        }
        .ProseMirror u {
          text-decoration: underline;
        }
        .ProseMirror h2 {
          font-size: 1.5em;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: bold;
        }
        .ProseMirror h3 {
          font-size: 1.25em;
          margin-top: 1.3em;
          margin-bottom: 0.5em;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
