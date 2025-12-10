import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "../Home/AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNotesImg from "../../assets/images/add-task.png";
import NoDataImg from "../../assets/images/empty-box.png";
import ViewNote from "../../components/ViewNote/ViewNote";

const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [showToastMsg, setShowToastMsg] = useState({
        isShown: false,
        message: "",
        type: "add",
    });

    const [allNotes, setAllNotes] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [isSearch, setIsSearch] = useState(false);

    const navigate = useNavigate();

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({
            isShown: true,
            type: "edit",
            data: noteDetails,
        });
    };

    const showToastMessage = (message, type) => {
        setShowToastMsg({
            isShown: true,
            message,
            type,
        });
    };
    const handleCloseToast = () => {
        setShowToastMsg({
            isShown: false,
            message: "",
        });
    };

    //VIEW NOTE
    const [viewNoteModal, setViewNoteModal] = useState({
        isShown: false,
        data: null,
    });

    const handleViewNote = (noteDetails) => {
        setViewNoteModal({
            isShown: true,
            data: noteDetails,
        });
    };

    const closeViewNote = () => {
        setViewNoteModal({
            isShown: false,
            data: null,
        });
    };

    // Get user info
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");

            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    // Get all notes
    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/get-all-notes");

            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.");
        }
    };

    // Delete Note
    const deleteNote = async (noteId) => {
        try {
            const response = await axiosInstance.delete(
                "/delete-note/" + noteId
            );

            if (response.data && !response.data.error) {
                showToastMessage("Note Deleted successfully", "delete");
                getAllNotes();
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.");
        }
    };

    // Search note
    const onSearchNote = async (query) => {
        try {
            const response = await axiosInstance.get("/search-notes", {
                params: { query },
            });

            if (response.data && response.data.notes) {
                setIsSearch(true);
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateIsPinned = async (id, currentPin) => {
        try {
            const response = await axiosInstance.put(`/edit-note/${id}`, {
                isPinned: !currentPin,
            });

            if (response.data && !response.data.error) {
                showToastMessage("Note Updated Successfully", "edit");
                getAllNotes();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClearSearch = () => {
        setIsSearch(false);
        getAllNotes();
    };

    useEffect(() => {
        getAllNotes();
        getUserInfo();
        return () => {};
    }, []);

    return (
        <>
            <Navbar
                userInfo={userInfo}
                onSearchNote={onSearchNote}
                handleClearSearch={handleClearSearch}
            />

            <div className="container mx-auto px-4 sm:px-6 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        My Notes
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {allNotes.length} {allNotes.length === 1 ? 'note' : 'notes'} • Stay organized and productive
                    </p>
                </div>

                {/* Grid layout for notes */}
                {allNotes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {allNotes.map((item) => (
                            <NoteCard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                date={item.createdOn}
                                content={item.content}
                                tags={item.tags}
                                isPinned={item.isPinned}
                                onEdit={() => handleEdit(item)}
                                onDelete={() => deleteNote(item.id)}
                                onPinNote={() =>
                                    updateIsPinned(item.id, item.isPinned)
                                }
                                onView={() => handleViewNote(item)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center min-h-[60vh]">
                        <EmptyCard
                            imgSrc={isSearch ? NoDataImg : AddNotesImg}
                            message={
                                isSearch
                                    ? `No notes found matching your search`
                                    : `Welcome to your notes! Click the '+' button below to create your first note and start organizing your thoughts.`
                            }
                        />
                    </div>
                )}
            </div>

            {/* Enhanced Floating Action Button */}
            <button
                className="group w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 fixed right-6 bottom-6 z-50"
                onClick={() => {
                    setOpenAddEditModal({
                        isShown: true,
                        type: "add",
                        data: null,
                    });
                }}
            >
                <MdAdd className="text-2xl text-white transform group-hover:rotate-90 transition-transform duration-200" />
                <div className="absolute -top-12 right-1 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Add New Note
                </div>
            </button>

            <ViewNote
                isOpen={viewNoteModal.isShown}
                noteData={viewNoteModal.data}
                onClose={closeViewNote}
            />

            {/* Enhanced Modal for Add/Edit Notes */}
            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => {}}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.5)",
                        backdropFilter: "blur(4px)",
                        zIndex: 1000,
                    },
                }}
                contentLabel=""
                className="w-full sm:max-w-2xl mx-auto mt-8 mb-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden"
            >
                <AddEditNotes
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({
                            isShown: false,
                            type: "add",
                            data: null,
                        });
                    }}
                    getAllNotes={getAllNotes}
                    showToastMessage={showToastMessage}
                />
            </Modal>

            {/* Toast Message */}
            <Toast
                isShown={showToastMsg.isShown}
                message={showToastMsg.message}
                type={showToastMsg.type}
                onClose={handleCloseToast}
            />
        </>
    );
};

export default Home;
