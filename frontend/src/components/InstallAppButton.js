import React, { useEffect, useState } from 'react'

  const InstallAppButton = () => {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);


    useEffect(() => {
      const handler = (e) => {
        e.preventDefault();
        console.log("We are being triggered! 🚀");
        setSupportsPWA(true);
        setPromptInstall(e);
      };
    
      window.addEventListener("beforeinstallprompt", handler);
    
      return () => {
        window.removeEventListener("beforeinstallprompt", handler); // Corrected event name
      };
    }, []);

    const onClick = (evt) => {
      evt.preventDefault();
      if (!promptInstall) {
        return;
      }
      promptInstall.prompt();
    };
    
  
  if (!supportsPWA) {
    return null;
  }
  return (
    <button
      className="link-button"
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      onClick={onClick}
    >
      Install
    </button>
  );

}

export default InstallAppButton