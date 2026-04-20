import TimeZone from "./_components/TimeZone";

export const metadata = {
  title: "Settings",
};

export default function Page() {
  return (
    <div className="w-fit mx-auto my-0">
      Settings Page
      <TimeZone />
      <p className="text-6xl underline">Under Development</p>
      {/* NOTE: THE PASSWORD RECOVERY COMPONENT SHOULD NOT BE DISPLAYED
      WHEN THE USER IS NOT VERIFIED, AND FOR VERIFIED USERS IT SHOULD.

      VERIFICATION COMPONENT
      THE VERIFY BUTTON COMPONENT IS HIDDEN WHEN USER VERIFIED AND
      SHOWN WHEN USER NOT VERIFIED/RENDER VERIFIED TEXT.*/}
    </div>
  );
}
