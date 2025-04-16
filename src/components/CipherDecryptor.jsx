import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { BsTerminalFill, BsReception4, BsLightningFill } from "react-icons/bs";
import { AiOutlineLock, AiOutlineBug } from "react-icons/ai";
import { GiCircuitry } from "react-icons/gi";
import { MdOutlineSecurity } from "react-icons/md";

const CipherDecryptor = () => {
  const [decrypting, setDecrypting] = useState(false);
  const [decryptionComplete, setDecryptionComplete] = useState(false);
  const [decryptedText, setDecryptedText] = useState("");
  const [progress, setProgress] = useState(0);
  const [showExplanation, setShowExplanation] = useState(true);
  const [typingIndex, setTypingIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit" })
  );

  const encryptedMessage =
    "Zhofrph wr wkh Surjudp ri Frpsxwlqj Vhfxulwb dw Vd[rqb Hjbsw Xqlyhuvlwb! Zh duh wkuloo hg wr kdyh brx hasoruh rxu zruog ri gljlwdo surwhfwlrq dqg fbehuvhfxulwb. Wr gdb, brx'yh hqfrxqwhuhg brxu iluvw hqfubswlrq fkdoohqjh - d Fdhvdu flskhu. Eb ghfrglqj wklv phvvdjh, brx'yh douhdgb wdnhq brxu iluvw vwhs lqwr wkh halflwlqj uhdop ri lqirupdwlrq vhfxulwb. Dw VHX, zh frpelqh Jhupdq hqjlqhhulqj suhflvlrq zlwk Hjbswldq lqqrydwlrq wr fuhdwh wrpruurz'v gljlwdo jxdugldqv. Zh krsh brx hqmrb brxu ylvlw dqg glvfryhu wkh idvflqdwlqj rssruwxqlwlhv zdvwlqj iru brx lq rxu surjudpv. Wkh gljlwdo zruog qhhgv euljkw plqgv olnh brxuv!";
  const decryptedMessage =
    "Welcome to the Program of Computing Security at Saxony Egypt University! We are thrilled to have you explore our world of digital protection and cybersecurity. Today, you've encountered your first encryption challenge - a Caesar cipher. By decoding this message, you've already taken your first step into the exciting realm of information security. At SEU, we combine German engineering precision with Egyptian innovation to create tomorrow's digital guardians. We hope you enjoy your visit and discover the fascinating opportunities waiting for you in our programs. The digital world needs bright minds like yours!";
  const terminalCommands = [
    'sudo ./decrypt_caesar.sh --input="encrypted_message.txt" --shift=3',
    "loading cryptography modules...",
    "initializing decryption algorithm...",
  ];
  const promptPath = "root@seu";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (decrypting && typingIndex < terminalCommands.length) {
      const timer = setTimeout(() => setTypingIndex((prev) => prev + 1), 800);
      return () => clearTimeout(timer);
    }
  }, [decrypting, typingIndex]);

  useEffect(() => {
    const cursorTimer = setInterval(() => setCursorVisible((prev) => !prev), 500);
    return () => clearInterval(cursorTimer);
  }, []);

  const startDecryption = () => {
    setDecrypting(true);
    setProgress(0);
    setDecryptedText("");
    setShowExplanation(false);
    setTypingIndex(0);
  };

  useEffect(() => {
    if (decrypting && typingIndex >= terminalCommands.length && progress < decryptedMessage.length) {
      const timer = setTimeout(() => {
        setProgress((prev) => {
          const newProgress = prev + 1;
          setDecryptedText(decryptedMessage.substring(0, newProgress));
          if (newProgress >= decryptedMessage.length) {
            setDecryptionComplete(true);
            setDecrypting(false);
          }
          return newProgress;
        });
      }, 40); // 40ms
      return () => clearTimeout(timer);
    }
  }, [decrypting, progress, typingIndex, decryptedMessage]);

  const resetDemo = () => {
    setDecryptionComplete(false);
    setDecryptedText("");
    setShowExplanation(true);
    setTypingIndex(0);
    setProgress(0);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 } },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -50, skewX: 2 },
    visible: { opacity: 1, x: 0, skewX: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, x: 50, skewX: -2, transition: { duration: 0.4, ease: "easeIn" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-1 sm:p-6 text-green-400 font-mono relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at center, #0a1a2a, #000000)",
          backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJElEQVQYV2NkwA/+J/8/AyYGBgYGZgYGBgZmBgYGBgYGZgYGBgAALQ4C7WHoYgAAAABJRU5ErkJggg==')",
          backgroundRepeat: "repeat",
          opacity: 0.9,
        }}
        animate={{ opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0 opacity-20 sm:opacity-25"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(0,255,204,0.1) 0px, rgba(0,255,204,0.1) 2px, transparent 2px, transparent 4px)
            `,
          }}
          animate={{ y: [0, -20], opacity: [0.15, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 opacity-10 sm:opacity-15"
          style={{ background: "linear-gradient(90deg, rgba(0,255,204,0.05), transparent)" }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-full sm:max-w-4xl bg-black rounded-lg shadow-2xl p-1 sm:p-4 overflow-hidden relative z-10 border-4 border-[#00ffcc]"
        style={{ boxShadow: "0 0 30px rgba(0,255,204,0.4), inset 0 0 10px rgba(0,255,204,0.1)" }}
      >
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{ border: "3px solid transparent" }}
          animate={{
            borderImage: [
              "linear-gradient(45deg, #00ffcc, #39ff14, #00ffcc) 10",
              "linear-gradient(45deg, #39ff14, #00ffcc, #39ff14) 10",
            ],
            boxShadow: ["0 0 15px rgba(0,255,204,0.4)", "0 0 30px rgba(0,255,204,0.7)"],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />

        <motion.div
          variants={headerVariants}
          className="bg-black p-2 rounded-t-lg flex flex-col sm:flex-row justify-between items-center border-b-2 border-[#00ffcc] text-[10px] sm:text-sm font-mono space-y-2 sm:space-y-0"
        >
          <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2 text-green-400 w-full sm:w-auto">
            <motion.div variants={headerVariants} className="flex items-center space-x-1">
              <BsTerminalFill className="text-[#39ff14] animate-pulse" />
              <span className="text-[#00ffcc]">_</span>
              <AiOutlineLock className="text-[#e0ffeb]" />
              <span className="text-[#e0ffeb] truncate max-w-[40vw] sm:max-w-none">{promptPath}</span>
            </motion.div>
            <motion.div variants={headerVariants} className="flex items-center space-x-1 mt-1 sm:mt-0">
              <span className="text-[#00ffcc] sm:ml-2">></span>
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-[#39ff14]"
              >
                {currentTime}
              </motion.span>
              <BsReception4 className="text-[#00ffcc] animate-pulse" />
            </motion.div>
          </div>
          <motion.div variants={headerVariants} className="flex items-center space-x-1 sm:space-x-2 text-green-400">
            <span className="text-[#00ffcc]">[</span>
            <GiCircuitry className="text-[#39ff14] animate-spin-slow" />
            <span className="text-[#e0ffeb]">] SIGNAL: ACTIVE</span>
          </motion.div>
        </motion.div>

        <div className="p-2 sm:p-6 overflow-y-auto max-h-[60vh] sm:max-h-[70vh] text-[10px] sm:text-base relative">
          <AnimatePresence mode="wait">
            {showExplanation && (
              <motion.div
                key="explanation"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mb-4 sm:mb-8 bg-black p-2 sm:p-4 rounded-lg border-2 border-[#00ffcc] relative"
                style={{ boxShadow: "0 0 20px rgba(0,255,204,0.2)" }}
              >
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{ border: "1px dashed #00ffcc" }}
                  animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.h2
                  variants={sectionVariants}
                  className="text-[#e0ffeb] text-sm sm:text-lg font-bold mb-2 text-center sm:text-left flex items-center justify-center sm:justify-start"
                >
                  <MdOutlineSecurity className="mr-2 text-[#39ff14]" />
                  > CAESAR CIPHER CORE
                </motion.h2>
                <motion.p
                  variants={sectionVariants}
                  className="mb-2 sm:mb-4 text-[#e0ffeb] text-[10px] sm:text-base"
                >
                  Accessing ancient crypto-matrix... Caesar cipher online. Deployed by rogue agents, 50 BCE.
                </motion.p>
                <motion.div
                  variants={sectionVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-2 sm:mb-4"
                >
                  <motion.div
                    className="bg-black p-2 sm:p-3 rounded border border-[#00ffcc] relative"
                    whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(0,255,204,0.4)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded pointer-events-none"
                      style={{ border: "1px solid #00ffcc" }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="text-[#e0ffeb] mb-2 text-[10px] sm:text-sm flex items-center">
                      <GiCircuitry className="mr-2 text-[#39ff14]" />
                      $> SCAN: caesar_cipher
                    </div>
                    <p className="text-[#e0ffeb] mb-2 text-[10px]">
                      Shifting data grid by quantum offset:
                    </p>
                    <div className="text-[#e0ffeb] text-[10px]">
                      <div>A → D [OFFSET: 3]</div>
                      <div>B → E [OFFSET: 3]</div>
                      <div>Z → C [OFFSET: 3]</div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="bg-black p-2 sm:p-3 rounded border border-[#00ffcc] relative"
                    whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(0,255,204,0.4)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded pointer-events-none"
                      style={{ border: "1px solid #00ffcc" }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="text-[#e0ffeb] mb-2 text-[10px] sm:text-sm flex items-center">
                      <BsLightningFill className="mr-2 text-[#39ff14]" />
                      $> EXEC: "HELLO" | caesar -s 3
                    </div>
                    <div className="text-[#e0ffeb] mb-1 text-[10px]">
                      INPUT: <span className="text-[#39ff14]">HELLO</span>
                    </div>
                    <div className="text-[#e0ffeb] mb-1 text-[10px]">
                      OUTPUT: <span className="text-[#39ff14]">KHOOR</span>
                    </div>
                    <div className="mt-2 text-[#e0ffeb] text-[10px] border-t border-[#00ffcc] pt-2">
                      shift('H') → 'K'<br />
                      shift('E') → 'H'<br />
                      shift('L') → 'O'<br />
                      shift('L') → 'O'<br />
                      shift('O') → 'R'
                    </div>
                  </motion.div>
                </motion.div>
                <motion.p
                  variants={sectionVariants}
                  className="mb-2 sm:mb-4 text-[#e0ffeb] text-[10px] sm:text-base"
                >
                  Target encrypted with offset=3. Booting decryption engine...
                </motion.p>
                <motion.button
                  variants={buttonVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(0,255,204,0.7)",
                    background: "linear-gradient(45deg, #1a3c34, #00ffcc)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    borderColor: ["#00ffcc", "#39ff14", "#00ffcc"],
                    boxShadow: ["0 0 15px rgba(0,255,204,0.3)", "0 0 25px rgba(0,255,204,0.6)"],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  onClick={startDecryption}
                  className="w-full bg-[#1a3c34] text-[#e0ffeb] font-bold py-2 px-3 rounded border-2 border-[#00ffcc] text-[10px] sm:text-base relative overflow-hidden min-h-[48px]"
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,204,0.2), transparent)" }}
                  />
                  <BsLightningFill className="inline mr-2" />
                  $> LAUNCH DECRYPTION
                </motion.button>
              </motion.div>
            )}

            {!showExplanation && (
              <motion.div
                key="decryption"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-3 sm:space-y-4"
              >
                <motion.div variants={sectionVariants}>
                  <div className="text-[#e0ffeb] mb-1 flex items-center">
                    <AiOutlineLock className="mr-2 text-[#39ff14]" />
                    $> cat encrypted_message.txt
                  </div>
                  <div className="text-[#e0ffeb] bg-black p-2 rounded border-2 border-[#00ffcc] animate-pulse">
                    {encryptedMessage}
                  </div>
                  <div className="text-[#00ffcc] mt-1">════</div>
                </motion.div>

                {decrypting && (
                  <motion.div variants={sectionVariants}>
                    <AnimatePresence>
                      {typingIndex > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="text-[#e0ffeb] mb-1 flex items-center"
                        >
                          <GiCircuitry className="mr-2 text-[#39ff14]" />
                          $> {terminalCommands[0]}
                        </motion.div>
                      )}
                      {typingIndex > 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="text-[#e0ffeb] mb-1 animate-pulse"
                        >
                          {terminalCommands[1]}
                        </motion.div>
                      )}
                      {typingIndex > 2 && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="text-[#e0ffeb] mb-1">{terminalCommands[2]}</div>
                          <div className="text-[#e0ffeb] mb-1 flex items-center">
                            <MdOutlineSecurity className="mr-2 text-[#39ff14]" />
                            STATUS: <span className="text-[#39ff14]">[{Math.round((progress / decryptedMessage.length) * 100)}%]</span>
                          </div>
                          <motion.div
                            className="w-full bg-black rounded-sm h-2 sm:h-3 border-2 border-[#00ffcc] overflow-hidden relative"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.5 }}
                          >
                            <motion.div
                              className="bg-gradient-to-r from-[#39ff14] to-[#00ffcc] h-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(progress / decryptedMessage.length) * 100}%` }}
                              transition={{ duration: 0.3 }}
                              style={{ boxShadow: "0 0 10px rgba(0,255,204,0.5)" }}
                            />
                            <motion.div
                              className="absolute inset-0"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,204,0.2), transparent)" }}
                            />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="text-[#00ffcc] mt-1">════</div>
                  </motion.div>
                )}

                {(decrypting && typingIndex > 2) || decryptionComplete ? (
                  <motion.div variants={sectionVariants}>
                    <div className="text-[#e0ffeb] mb-1 flex items-center">
                      <AiOutlineLock className="mr-2 text-[#39ff14]" />
                      $> cat decrypted_output.txt
                    </div>
                    <div className="text-[#e0ffeb] bg-black p-2 rounded border-2 border-[#00ffcc] whitespace-pre-wrap">
                      {decryptedText}
                      {!decryptionComplete && cursorVisible && (
                        <motion.span
                          animate={{ opacity: [1, 0], scale: [1, 1.2] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="text-[#39ff14] inline-block w-1 h-3 sm:h-4 bg-[#39ff14]"
                          style={{ verticalAlign: "middle" }}
                        />
                      )}
                    </div>
                    <div className="text-[#00ffcc] mt-1">════</div>
                  </motion.div>
                ) : null}

                {decryptionComplete && (
                  <motion.div variants={sectionVariants}>
                    <div className="text-[#e0ffeb] mb-1 flex items-center">
                      <MdOutlineSecurity className="mr-2 text-[#39ff14]" />
                      $> validate --success
                    </div>
                    <div className="text-[#e0ffeb] mb-1 animate-pulse">DECRYPTION COMPLETE. ACCESS GRANTED.</div>
                    <div className="text-[#e0ffeb] mb-2">
                      Proceed to secure node. System integrity at 100%.
                    </div>
                    <motion.button
                      variants={buttonVariants}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 30px rgba(0,255,204,0.7)",
                        background: "linear-gradient(45deg, #1a3c34, #00ffcc)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        borderColor: ["#00ffcc", "#39ff14", "#00ffcc"],
                        boxShadow: ["0 0 15px rgba(0,255,204,0.3)", "0 0 25px rgba(0,255,204,0.6)"],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                      onClick={resetDemo}
                      className="w-full bg-[#1a3c34] text-[#e0ffeb] font-bold py-2 px-3 rounded border-2 border-[#00ffcc] text-[10px] sm:text-base relative overflow-hidden min-h-[48px]"
                    >
                      <motion.div
                        className="absolute inset-0"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,204,0.2), transparent)" }}
                      />
                      <BsLightningFill className="inline mr-2" />
                      $> REBOOT SYSTEM
                    </motion.button>
                  </motion.div>
                )}

                {!decryptionComplete && !decrypting && (
                  <motion.div variants={sectionVariants}>
                    <motion.button
                      variants={buttonVariants}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 30px rgba(0,255,204,0.7)",
                        background: "linear-gradient(45deg, #1a3c34, #00ffcc)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        borderColor: ["#00ffcc", "#39ff14", "#00ffcc"],
                        boxShadow: ["0 0 15px rgba(0,255,204,0.3)", "0 0 25px rgba(0,255,204,0.6)"],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                      onClick={startDecryption}
                      className="w-full bg-[#1a3c34] text-[#e0ffeb] font-bold py-2 px-3 border-2 border-[#00ffcc] rounded text-[10px] sm:text-base relative overflow-hidden min-h-[48px]"
                    >
                      <motion.div
                        className="absolute inset-0"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,204,0.2), transparent)" }}
                      />
                      <BsLightningFill className="inline mr-2" />
                      $> ACTIVATE DECRYPTION
                    </motion.button>
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="mt-2 text-[#e0ffeb] text-[10px] block text-center"
                    >
                      [SYSTEM READY]
                    </motion.span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            variants={footerVariants}
            className="text-[#00ffcc] text-[10px] border-t-2 border-[#00ffcc] pt-2 mt-3 sm:mt-6 relative"
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ borderTop: "1px dashed #00ffcc" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="text-center flex items-center justify-center">
              <AiOutlineBug className="mr-2 text-[#39ff14]" />
              SEU-TERMINAL v4.0.0 | LIMITED ACCESS
            </div>
            <div className="text-center text-[#e0ffeb]">© 2025 SEU | COMMAND: 'override' FOR PROTOCOLS</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

CipherDecryptor.propTypes = {};

export default CipherDecryptor;
