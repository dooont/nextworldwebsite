import PurpleLogo from "../../assets/mainLogoPurple.png";

/**
 * Loading Spinner
 * @param {String} className - Style it using className
 */
export default function LoadingSpinner({ className }) {
    return <img src={PurpleLogo} alt="" className={`animate-spin ${className}`}></img>
}