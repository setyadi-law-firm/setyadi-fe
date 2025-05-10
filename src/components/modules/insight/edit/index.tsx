"use client";

import { useParams, useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import { useState, useRef, useEffect } from "react";
import DOMPurify from "isomorphic-dompurify";

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

export function InsightEditPageModule() {
  const { id } = useParams<{
    id: string;
  }>();
  const router = useRouter();

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
  const [editorJSON, setEditorJSON] = useState<any>(null); // Store as JSON
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
      setEditorJSON(editor.getJSON());
    },
  });

  // Image upload handler
  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setMainImage(imageUrl);
        setHasUnsavedChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle inline image upload for editor
  const handleInlineImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editor) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        editor.chain().focus().setImage({ src: imageUrl }).run();
        setHasUnsavedChanges(true);
      };
      reader.readAsDataURL(file);
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

  const handleSave = () => {
    // Sanitize the HTML content before sending to server
    const sanitizedContent = DOMPurify.sanitize(editorContent);

    // Prepare the data to send to backend
    const articleData = {
      title,
      author,
      date: `${date.year}-${date.month}-${date.day}`,
      content: sanitizedContent, // Sanitized HTML content
      contentJSON: editorJSON, // JSON structure for future editing
      mainImage, // You might want to upload this separately and store a URL
    };

    // Here you would make an API call to save the data
    console.log("Saving article data:", articleData);

    setShowSaveDialog(true);
    // After successful save:
    // setHasUnsavedChanges(false);
  };

  const confirmDiscard = () => {
    setShowUnsavedDialog(false);
    router.back();
  };

  const confirmSave = () => {
    // Save implementation
    setHasUnsavedChanges(false);
    setShowSaveDialog(false);
    router.back();
  };

  // Function to initialize editor with existing content (for edit mode)
  const loadExistingContent = async (articleId: string) => {
    try {
      // Example API call - replace with your actual data fetching
      // const response = await fetch(`/api/articles/${articleId}`);
      // const article = await response.json();

      // For demo purposes with rich formatting example:
      const article = {
        title: "Example Rich Text Article",
        author: "John Doe",
        date: "2023-05-15",
        content: `
          <h2>Sample Article with Rich Formatting</h2>
          <p>This is a <strong>bold text example</strong> in a paragraph.</p>
          <p>Here we have some <em>italic text</em> for emphasis.</p>
          <p>And this text has <u>underline formatting</u> applied to it.</p>
          
          <h3>List Example</h3>
          <ul>
            <li>First bullet point item</li>
            <li>Second bullet point with <strong>bold text</strong></li>
            <li>Third bullet point with <em>italics</em></li>
          </ul>
          
          <p>Below is an example image:</p>
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNjY2NjY2MiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIxOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIGZpbGw9IiM2NjY2NjYiPnNhbXBsZSBpbWFnZTwvdGV4dD48L3N2Zz4=" alt="Sample image" />
          
          <p>And then some more text after the image.</p>
          
          <h3>Numbered List</h3>
          <ol>
            <li>First ordered item</li>
            <li>Second ordered item with <u>underlined text</u></li>
            <li>Third ordered item with <strong><em>bold and italic</em></strong> text</li>
          </ol>
          
          <p>This is how your content would look when retrieved from the backend.</p>
        `,
        // You can also include contentJSON if you're storing the JSON structure
      };

      setTitle(article.title);
      setAuthor(article.author);

      // Parse date
      const dateParts = article.date.split("-");
      if (dateParts.length === 3) {
        setDate({
          year: dateParts[0],
          month: dateParts[1],
          day: dateParts[2],
        });
      }

      // Set editor content if editor is ready
      if (editor) {
        editor.commands.setContent(article.content);
      }

      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Failed to load article:", error);
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
        onClick={() => router.back()}
      >
        <ArrowLeft size={16} />
      </Button>
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

        <div className="space-y-2">
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
        </div>
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
        {/* Optional: Preview section */}
        <div className="mt-8 border-t pt-4">
          <Label className="mb-2">Content Preview</Label>
          <div
            className="border rounded-md p-4 prose max-w-none article-preview"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(editorContent),
            }}
          />
        </div>
      </div>
      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <Button type="button" onClick={handleSave}>
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
        .ProseMirror {
          outline: none;
          min-height: 280px;
        }
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
        .ProseMirror li p {
          margin: 0;
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

        /* Preview styles */
        .article-preview p {
          margin: 1em 0;
        }
        .article-preview img {
          max-width: 100%;
          height: auto;
        }
        .article-preview ul,
        .article-preview ol {
          padding-left: 1.5rem;
          margin: 1em 0;
        }
        .article-preview ul {
          list-style-type: disc;
        }
        .article-preview ol {
          list-style-type: decimal;
        }
        .article-preview li {
          margin-bottom: 0.5em;
        }
        .article-preview strong {
          font-weight: bold;
        }
        .article-preview em {
          font-style: italic;
        }
        .article-preview u {
          text-decoration: underline;
        }
        .article-preview h2 {
          font-size: 1.5em;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: bold;
        }
        .article-preview h3 {
          font-size: 1.25em;
          margin-top: 1.3em;
          margin-bottom: 0.5em;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
