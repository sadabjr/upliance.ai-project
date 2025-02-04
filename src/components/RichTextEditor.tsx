import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
}

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['clean'],
  ],
};

const formats = [
  'bold', 'italic', 'underline',
  'list', 'bullet',
];

const RichTextEditor = ({ initialContent = '', onSave }: RichTextEditorProps) => {
  // Explicitly typing the 'content' state as a string
  const [content, setContent] = useState<string>(initialContent);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const handleChange = (value: string) => {
    setContent(value);
    setIsSaved(false);
    localStorage.setItem('editorContent', value);
    if (onSave) {
      onSave(value);
    }
  };

  const handleSave = () => {
    localStorage.setItem('editorContent', content);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Content Editor</h3>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-blue-500/25 transition-all duration-300"
            >
              {isSaved ? 'Saved!' : 'Save'}
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            className="h-64 rounded-lg [&>.ql-container]:rounded-b-lg [&>.ql-toolbar]:rounded-t-lg [&>.ql-toolbar]:border-gray-200 [&>.ql-container]:border-gray-200 [&>.ql-toolbar]:bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
