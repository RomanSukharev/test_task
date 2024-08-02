interface Note {
  id: number;
  title: string;
  body: string;
  created_at: string;
}

const NOTES_STORAGE_KEY = "notes";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref<Note[]>([]);
  const currentPage = ref<number>(1);

  const checkToken = async (): Promise<boolean> => {
    const token = localStorage.getItem("token");
    if (token === null) {
      return false;
    }
    try {
      const response = await fetch("http://localhost:8000/api/check_token/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data.status === "OK";
      }
      else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Token validation failed", error);
      return false;
    }
  };

  const initializeNotes = async () => {
    const isAuthenticated = await checkToken();
    if (!isAuthenticated) {
      console.error("User is not authenticated");
      window.location.href = "/";
      return;
    }

    await fetchNotes(currentPage.value);
  };

  const fetchNotes = async (page: number) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8000/api/notes/?page=${page}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        notes.value = data.results;
        saveNotes();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch notes", error);
    }
  };

  const createNote = async (title: string, body: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8000/api/notes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ title: String(title), body: String(body) }),
      });
      if (response.ok) {
        const newNote = await response.json();
        if (newNote && typeof newNote === "object") {
          notes.value.push(newNote);
          saveNotes();
        } else {
          console.error("Invalid note format received from server");
        }
      } else {
        const errorResponse = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${JSON.stringify(
            errorResponse
          )}`
        );
      }
    } catch (error) {
      console.error("Failed to create note", error);
    }
  };

  const updateNote = async (updatedNote: Note) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8000/api/notes/${updatedNote.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(updatedNote),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        const index = notes.value.findIndex((note: { id: any; }) => note.id === updated.id);
        if (index !== -1) {
          notes.value[index] = updated;
          saveNotes();
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to update note", error);
    }
  };

  const deleteNote = async (noteId: number) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8000/api/notes/${noteId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.ok) {
        notes.value = notes.value.filter((note: { id: number; }) => note.id !== noteId);
        saveNotes();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to delete note", error);
    }
  };

  const saveNotes = () => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes.value));
  };

  return {
    notes,
    currentPage,
    initializeNotes,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
  };
});
