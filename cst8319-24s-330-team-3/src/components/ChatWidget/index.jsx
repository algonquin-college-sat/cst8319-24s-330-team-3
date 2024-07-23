import { styles } from "./styles";
import { BsFillChatFill } from "react-icons/bs";
import ModalWindow from "./ModalWindow";
 import { useState, useEffect,useRef } from "react";
function ChatWidget() {
  const [visible, setVisible] = useState(false);
  const widgetRef = useRef(null);
  // use effect listener to check if the mouse was cliked outside the window 
  useEffect(() => {
    function handleClickOutside(event) {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [widgetRef]);
 return (
  
   <div>
    <div ref={widgetRef}>
     <ModalWindow  visible={visible} />
     {/* Chat Button Component */}
     <div
       onClick={() => setVisible(!visible)}
       >
       
     <div
       style={{
         ...styles.chatWidget
       }}
     >
      
       <div
         style={{
           display: "flex",
           alignItems: "center",
           justifyContent: "center",
         }}
       >
       

        {/* Button Icon */}
        <BsFillChatFill size={20} color="white" />
         {/* Button Text */}
         <span style={styles.chatWidgetText}>Chat Now!!</span>
       </div>
     </div>
     </div>
   </div>
   </div>

   
 );
}

export default ChatWidget;
