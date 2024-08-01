import { colors } from "./config";

export const styles = {
   chatWidget: {
       // Position
       position: "fixed",
       bottom: "20px",
       right: "20px",
       backgroundColor: colors.primary,
       // Padding
       paddingLeft: "18px",
       paddingRight: "18px",
       paddingTop: "7px",
       paddingBottom: "7px",
       // Border
       borderRadius: "10px",
       cursor: "pointer",
   },

   chatWidgetText: {
       color: "white",
       fontSize: "15px",
       marginLeft: "5px",
   },
   // Styling for model window 
  modalWindow: {
    // Position
    position: "fixed",
    bottom: "70px",
    right: "20px",
    // Size
    width: "350px",
    height: "75vh",
    maxWidth: "calc(100% - 48px)",
    maxHeight: "calc(100% - 48px)",
    backgroundColor: "white",
    borderRadius: "12px",
    border: `2px solid ${colors.primary}`,
    overflow: "hidden",
    boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
  },

}
