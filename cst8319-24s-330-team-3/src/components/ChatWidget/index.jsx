import React, { useEffect, useState, useRef } from 'react';
import { BsFillChatFill } from 'react-icons/bs';
import ModalWindow from './ModalWindow';
import { db, realtimeDb } from '../../firebase'; // Import Firestore and Realtime Database
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { ref, onValue, push, set, off } from 'firebase/database';
import { styles } from './styles'; // Import styles

function ChatWidget({ eventId, userId }) {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const widgetRef = useRef(null);
  const [chatroomId, setChatroomId] = useState('');
  const chatroomRef = useRef(null); // Reference for chatroom listener

  const senderId = "Restaurant"; 

  useEffect(() => {
    if (!eventId || !userId) {
      console.error("EventId or userId is missing");
      return;
    }

    async function fetchChatroomId() {
      const chatroomsWithResRef = collection(db, 'ChatroomsWithRes');
      const q = query(chatroomsWithResRef, where('EventId', '==', eventId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const chatroomDoc = querySnapshot.docs[0];
        setChatroomId(chatroomDoc.id);
      } else {
        // Create a new chatroom if none exists
        const newChatroomId = `${Date.now()}`;
        await setDoc(doc(db, 'ChatroomsWithRes', newChatroomId), {
          RestaurantId: 'some_restaurant_id', // Replace with actual restaurant ID
          EventId: eventId,
          userId: userId,
        });
        setChatroomId(newChatroomId);
      }
    }
    fetchChatroomId();
  }, [eventId, userId]);

  useEffect(() => {
    if (chatroomId) {
      const chatroomDbRef = ref(realtimeDb, `Chats/${chatroomId}`);
      chatroomRef.current = chatroomDbRef; // Store reference for cleanup

      const handleValueChange = (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const loadedMessages = [];
          for (const sender in data) {
            for (const id in data[sender]) {
              loadedMessages.push({ id, sender, ...data[sender][id] });
            }
          }
          // Sort messages: first those without timestamp, then those with timestamp (by ascending order)
          loadedMessages.sort((a, b) => {
            if (a.timestamp === undefined && b.timestamp !== undefined) return -1;
            if (a.timestamp !== undefined && b.timestamp === undefined) return 1;
            if (a.timestamp === undefined && b.timestamp === undefined) return 0;
            return a.timestamp - b.timestamp; // Ascending order
          });
          setMessages(loadedMessages);
        }
      };

      onValue(chatroomDbRef, handleValueChange);

      // Cleanup function
      return () => {
        if (chatroomRef.current) {
          off(chatroomRef.current, 'value', handleValueChange);
        }
      };
    }
  }, [chatroomId]);

  function handleSendMessage(newMessage) {
    if (chatroomId) {
      const chatroomRef = ref(realtimeDb, `Chats/${chatroomId}/${senderId}`);
      const newMessageRef = push(chatroomRef);
      set(newMessageRef, {
        message: newMessage,
        sender: senderId,
        timestamp: Date.now() // Store as milliseconds
      }).then(() => {
        // Fetch messages again after sending a new one to ensure order
        const chatroomRef = ref(realtimeDb, `Chats/${chatroomId}`);
        onValue(chatroomRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const loadedMessages = [];
            for (const sender in data) {
              for (const id in data[sender]) {
                loadedMessages.push({ id, sender, ...data[sender][id] });
              }
            }
            // Sort messages
            loadedMessages.sort((a, b) => {
              if (a.timestamp === undefined && b.timestamp !== undefined) return -1;
              if (a.timestamp !== undefined && b.timestamp === undefined) return 1;
              if (a.timestamp === undefined && b.timestamp === undefined) return 0;
              return a.timestamp - b.timestamp; // Ascending order
            });
            setMessages(loadedMessages);
          }
        });
      });
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [widgetRef]);

  return (
    <div>
      <div ref={widgetRef}>
        <ModalWindow visible={visible} messages={messages} onSendMessage={handleSendMessage} />
        <div onClick={() => setVisible(!visible)}>
          <div style={styles.chatWidget}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BsFillChatFill size={20} color='white' />
              <span style={styles.chatWidgetText}>Chat Now!!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWidget;
