'use client'

import { deleteEntry } from "@/utils/api";

export const DeleteComponent = ({eventId}) => {
  return (
    <button
      onClick={() => deleteEntry(eventId)}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="button"
    >
      Delete
    </button>
  );
};


export default DeleteComponent;