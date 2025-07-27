import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import useAuthProvider from "./../../../../Hooks/useAuthProvider";
import { db } from "../../../../Firebase/Firebase.init";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { firebaseUser, user } = useAuthProvider(); // Get logged-in user info

  // 🔄 Realtime listener for messages
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(data);
    });

    // 🧹 Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  // 📩 Send a new message to Firestore
  const sendMessage = async () => {
    if (!newMessage.trim() || !firebaseUser) return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      displayName: firebaseUser.displayName || user?.name,
      uid: firebaseUser.uid,
      photoURL: firebaseUser.photoURL || user?.profileImage,
      timestamp: serverTimestamp(),
    });
    setNewMessage(""); // Clear input after sending
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* 💬 Chat Header */}
      <h2 className="text-2xl font-bold mb-4 text-center">💬 Community Chat</h2>

      {/* 📜 Messages Container */}
      <div className="bg-white border  border-primary/40 p-4 rounded h-[400px] overflow-y-scroll space-y-4 mb-4">
        {messages.map((msg) => {
          // Convert Firestore timestamp to JS Date
          const date = msg.timestamp?.toDate(); // Check if timestamp exists
          const formattedDate = date
            ? date.toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })
            : "Sending...";

          return (
            <div key={msg.id} className="flex items-start space-x-2 bg-gray-50 p-2 rounded">
              {/* 👤 User Avatar */}
              {msg.photoURL && (
                <img
                  src={msg.photoURL}
                  alt={msg.displayName}
                  className="w-8 h-8 rounded-full"
                />
              )}
              {/* 💬 Message Content */}
              <div className="">
                <p className="text-sm font-semibold">{msg.displayName}</p>
                <p className="text-sm text-gray-500">{formattedDate}</p>{" "}
                {/* 🕒 Date */}
                <p className="text-sm mt-2">{msg.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 📥 Input Field & Button */}
      <div className="flex gap-2">
        <input
          type="text"
          className="input input-bordered flex-1"
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
