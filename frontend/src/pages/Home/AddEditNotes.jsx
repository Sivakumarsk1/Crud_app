import React, { useState } from 'react';
import TagInput from '../../components/Input/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // ADD NOTE
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note added successfully", "add");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  // EDIT NOTE  ✅ FIXED
  const editNote = async () => {

    const noteId = noteData.id; // ✅ Correct for MySQL (was _id before)

    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });

      if (response.data && !response.data.error) {
        showToastMessage("Note updated successfully", "edit");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === 'edit') editNote();
    else addNewNote();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-full max-w-md bg-white rounded-md shadow-lg p-6 mx-4 relative">

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <MdClose className="text-2xl" />
        </button>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        {/* Content Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter content"
            rows={6}
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>

        {/* Tags Input */}
        <div className="mb-4 max-w-full overflow-x-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <TagInput tags={tags} setTags={setTags} />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm font-medium"
          onClick={handleAddNote}
        >
          {type === 'edit' ? 'Update Note' : 'Add Note'}
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;
