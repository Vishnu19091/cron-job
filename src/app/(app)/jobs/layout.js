import SideBar from "@/app/_components/SideBar";
import { CreateJobProvider } from "@/app/_contexts/JobCreateContext";

/**
 * This Layout provides CreateJob Context to createPage
 */
export default function CreateJobLayout({ children }) {
  return <CreateJobProvider>{children}</CreateJobProvider>;
}
