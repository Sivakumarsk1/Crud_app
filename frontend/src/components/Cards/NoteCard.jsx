import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';
import moment from 'moment';

const NoteCard = ({
  id,
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
  onView,
}) => {
  const tagsArray = typeof tags === 'string' ? tags.split(',') : tags || [];

  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl cursor-pointer">

      <div className="flex justify-between items-center">
        <div onClick={() => onView(id)}>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`}
          onClick={() => onPinNote(id)}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2" onClick={() => onView(id)}>
        {content?.slice(0, 60)}
        {content && content.length > 60 ? "..." : ""}
      </p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500" onClick={() => onView(id)}>
          {tagsArray.map((item, i) => (
            <span key={i} className="mr-1">
              #{item.trim()}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate className="icon-btn hover:text-green-600" onClick={() => onEdit(id)} />
          <MdDelete className="icon-btn hover:text-red-500" onClick={() => onDelete(id)} />
        </div>
      </div>

    </div>
  );
};

export default NoteCard;
