import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "../Button/Button";
import UserAvatar from "../UserAvatar/UserAvatar";
import TruncatedText from "../TruncatedText/TruncatedText";
import { authService } from "../../features/auth";
import { clearUser } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleMode } from "../../store/themeSlice";

export default function Header({ onMenu }: { onMenu: () => void }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const mode = useAppSelector((s) => s.theme.mode);

  const logout = async () => {
    try {
      await authService.logout();
      toast.success("You have been logged out. See you soon!");
    } catch {
      toast.error("We could not log you out cleanly, but your session was cleared on this device.");
    }
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-hairline bg-canvas px-page">
      <Button variant="icon" onClick={onMenu} aria-label="Open menu" className="lg:hidden">
        <MenuIcon fontSize="small" />
      </Button>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="icon" onClick={() => dispatch(toggleMode())} aria-label="Switch theme">
          {mode === "dark" ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
        </Button>
        {user && (
          <>
            <div className="hidden max-w-40 items-center gap-2 sm:flex">
              <UserAvatar user={user} />
              <TruncatedText text={user.fullName} className="text-small font-semibold text-ink" />
            </div>
            <Button variant="secondary" onClick={logout}>
              Log out
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
