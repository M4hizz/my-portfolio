import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ButtonNorm from "./ButtonNorm";

const SocialButton = ({
  icon,
  label,
  link,
}: {
  icon: string;
  label: string;
  link: string;
}) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 w-full px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
      whileHover={{ scale: 1.05, x: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      data-cursor-selectable="true"
    >
      <img
        src={icon}
        alt={label}
        className="w-6 h-6"
        style={{ filter: "brightness(0) invert(1)" }}
      />
      <span className="text-lg font-medium">{label}</span>
    </motion.a>
  );
};

const Sidebar = ({
  currentPage,
}: {
  currentPage: "about" | "skills" | "projects" | "future";
}) => {
  return (
    <div
      id="left-panel"
      className="absolute flex flex-col items-start top-[50%] -translate-y-1/2 text-white text-2xl w-[35vh] h-[80vh] p-5 mx-5"
    >
      <div
        id="sidebar"
        className="relative pointer-events-auto flex flex-col flex-4 items-start top-[0vh] space-y- text-white text-2xl w-[100%] p-5 mx-5 bg-white/5 transparent backdrop-blur-xs rounded-3xl [&>*]:my-auto"
      >
        {currentPage === "about" ? (
          <ButtonNorm title="About" cn="" />
        ) : (
          <Link to={"/"} className="w-full">
            <ButtonNorm title="About" cn="" />
          </Link>
        )}

        {currentPage === "skills" ? (
          <ButtonNorm title="Skills" cn="" />
        ) : (
          <Link to={"/skills"} className="w-full">
            <ButtonNorm title="Skills" cn="" />
          </Link>
        )}

        {currentPage === "projects" ? (
          <ButtonNorm title="Projects" cn="" />
        ) : (
          <Link to={"/projects"} className="w-full">
            <ButtonNorm title="Projects" cn="" />
          </Link>
        )}

        {currentPage === "future" ? (
          <ButtonNorm title="Future" cn="" />
        ) : (
          <Link to={"/future"} className="w-full">
            <ButtonNorm title="Future" cn="" />
          </Link>
        )}
      </div>

      <div
        id="socials"
        className="relative flex flex-1 flex-col items-start justify-start top-[0vh] text-white text-2xl w-[100%] p-5 mx-5 mt-5 bg-white/5 transparent backdrop-blur-xs rounded-3xl gap-4"
      >
        {/* Profile Picture */}
        <motion.div
          className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500 shadow-lg"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src="/src/assets/socials/profile.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Social Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <SocialButton
            icon="/src/assets/socials/instagram.svg"
            label="Instagram"
            link="https://www.instagram.com/m4hi_zz/"
          />
          <SocialButton
            icon="/src/assets/socials/github.svg"
            label="GitHub"
            link="https://github.com/M4hizz"
          />
          <SocialButton
            icon="/src/assets/socials/download.svg"
            label="Download Resume"
            link="/Mahin Patel - Resume.pdf"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
