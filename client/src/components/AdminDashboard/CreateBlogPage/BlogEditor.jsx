import React, { useEffect, useState } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import '@mantine/tiptap/styles.css';

const BlogEditor = ({ onContentChange, initialContent = '', editorKey = 'default' }) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      Superscript,
      Subscript,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      // Add TextStyle and Color to allow custom text styling:
      TextStyle,
      Color.configure({ types: ['textStyle'] }),
    ],
    content: content || '<p>Start writing your post here...</p>',
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4" key={editorKey}>
      <div className="rounded-md border border-gray-300 shadow-sm overflow-hidden">
        <RichTextEditor editor={editor} 
          classNames={{
            root: 'rounded-md border border-gray-300 shadow-sm overflow-hidden',
            toolbar: 'flex flex-wrap gap-1 px-3 py-2 border-b border-gray-200 bg-white',
            content: 'min-h-[250px] p-4 text-[16px] leading-relaxed focus:outline-none prose max-w-none',
            control:
              'text-gray-700 text-[18px] p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 data-[active=true]:bg-blue-600 data-[active=true]:text-white data-[active=true]:shadow-inner',
            controlsGroup: 'gap-1',
          }}
        >
          <RichTextEditor.Toolbar sticky stickyOffset={0}>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />

            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />

            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />

            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignRight />
            <RichTextEditor.AlignJustify />

            <RichTextEditor.Link />
            <RichTextEditor.Unlink />

            {/* Custom control for text color using Color extension */}
            {editor && (
              <div className="flex items-center gap-1 px-2">
                <input
                  type="color"
                  defaultValue="#000000"
                  onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                  className="w-8 h-8 p-0 border-none cursor-pointer"
                />
              </div>
            )}

            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor>
      </div>
    </div>
  );
};

export default BlogEditor;
