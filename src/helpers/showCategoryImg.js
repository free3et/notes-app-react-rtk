import listImg from "../assets/list-icon.png";
import brainImg from "../assets/brain-icon.png";
import lampImg from "../assets/lamp-icon.png";
import quoteImg from "../assets/quote-icon.png";

export function addImgToCategory(category) {
  let imageSrc = "";

  switch (category) {
    case "Task":
      imageSrc = listImg;
      break;
    case "Random Thought":
      imageSrc = brainImg;
      break;
    case "Idea":
      imageSrc = lampImg;
      break;
    case "Quote":
      imageSrc = quoteImg;
      break;
    default:
      break;
  }

  return imageSrc;
}
