import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { ArticleOutlined } from "@mui/icons-material";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import MovieCreationRoundedIcon from "@mui/icons-material/MovieCreationRounded";
/**
 * Function will return the icon file name based on the icon
 * @param {string} fileName - Name of the file
 * @returns {string} - Icon
 *
 */

export default function getIconFile(fileName) {
  const extension = fileName.split(".").pop();
  switch (extension) {
    case "pdf":
      return <PictureAsPdfIcon />;
    case "doc":
    case "docx":
      return <ArticleOutlined />;
    // for Music
    case "mp3":
    case "wav":
    case "ogg":
    case "mp4":
      return <MusicNoteRoundedIcon />;
    // For Movie
    case "mpg":
    case "mpeg":
    case "avi":
    case "mov":
    case "wmv":
    case "flv":
    case "mkv":
      return <MovieCreationRoundedIcon />;
    case "xls":
    case "xlsx":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
          />
        </svg>
      );

    case "ppt":
    case "pptx":
      return <SlideshowIcon />;
    case "zip":
    case "rar":
      return <FolderZipIcon />;
    case "txt":
      return <TextSnippetIcon />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <InsertPhotoIcon />;
    default:
      return <InsertDriveFileIcon />;
  }
}

// return true if file is img else false
export function isImageFile(fileName) {
  const extension = fileName.split(".").pop();
  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return true;
    default:
      return false;
  }
}
