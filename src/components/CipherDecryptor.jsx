import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CipherDecryptor = () => {
  const [decrypting, setDecrypting] = useState(false);
  const [decryptionComplete, setDecryptionComplete] = useState(false);
  const [decryptedText, setDecryptedText] = useState("");
  const [progress, setProgress] = useState(0);
  const [showExplanation, setShowExplanation] = useState(true);
  const [typingIndex, setTypingIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  const encryptedMessage =
    "Zhofrph wr VHX Xqlyhuvlwb! Zh duh gholjkwhg wr kdyh brx zlwk xv wrgdb dv zh vkrzfdvh rxu dgydqfhphqwv lq frpsxwlqj vhfxulwb. Brxu ylvlw lv dq krqru, dqg zh orrn iruzdug wr lqvljkwixo glvfxvvlrqv dqg ixwxuh fROoderudwlrqv";
  const decryptedMessage =
    "Welcome to SEU University! We are delighted to have you with us today as we showcase our advancements in computing security. Your visit is an honor, and we look forward to insightful discussions and future cOLlaborations";

  const terminalCommands = [
    'sudo ./decrypt_caesar.sh --input="encrypted_message.txt" --shift=3',
    "loading cryptography modules...",
    "initializing decryption algorithm...",
  ];

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
    if (decrypting && progress < 100 && typingIndex >= terminalCommands.length) {
      const timer = setTimeout(() => {
        setProgress((prev) => {
          const newProgress = prev + 1;
          const charsToShow = Math.floor((newProgress / 100) * decryptedMessage.length);
          setDecryptedText(decryptedMessage.substring(0, charsToShow));
          if (newProgress >= 100) {
            setDecryptionComplete(true);
            setDecrypting(false);
          }
          return newProgress;
        });
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [decrypting, progress, typingIndex, decryptedMessage]);

  const resetDemo = () => {
    setDecryptionComplete(false);
    setDecryptedText("");
    setShowExplanation(true);
    setTypingIndex(0);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6 text-green-500 font-mono relative overflow-hidden">
      {/* Matrix Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(45deg, #0a0a0a, #1a1a1a)",
        }}
      >
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, rgba(34,197,94,0.1) 0px, rgba(34,197,94,0.1) 2px, transparent 2px, transparent 4px),
              repeating-linear-gradient(0deg, rgba(34,197,94,0.1) 0px, rgba(34,197,94,0.1) 2px, transparent 2px, transparent 4px)
            `,
          }}
          animate={{
            y: [0, -20],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(34,197,94,0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 70% 70%, rgba(34,197,94,0.15) 0%, transparent 70%)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl p-2 sm:p-4 overflow-hidden relative z-10"
        style={{
          border: "1px solid transparent",
          backgroundClip: "padding-box",
        }}
      >
        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ 
            border: "2px solid transparent",
            borderImage: "linear-gradient(45deg, #22c55e, #16a34a, #22c55e) 1",
          }}
          animate={{
            borderImage: [
              "linear-gradient(45deg, #22c55e, #16a34a, #22c55e) 1",
              "linear-gradient(45deg, #16a34a, #22c55e, #16a34a) 1",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-2 rounded-t-lg flex items-center space-x-2 border-b border-green-900 relative">
          <motion.div 
            className="h-3 w-3 rounded-full bg-red-500"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div 
            className="h-3 w-3 rounded-full bg-yellow-500"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div 
            className="h-3 w-3 rounded-full bg-green-500"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.2 }}
          />
          <div className="ml-2 text-gray-400 text-sm sm:text-base flex-1 text-center truncate">
            seu-university@terminal:~/security-demo
          </div>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto max-h-[80vh]">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            className="mb-2 text-green-400 text-sm sm:text-base"
          >
            [SEU-SECURITY]$ ./launcher.sh --module=caesar_cipher
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="text-green-500 mb-6 text-lg sm:text-xl font-bold"
          >
            SEU University Terminal - Security Showcase v2.0.3
          </motion.h1>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="mb-8 bg-gradient-to-br from-black to-gray-900 bg-opacity-70 p-4 rounded-lg relative"
              >
                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{ 
                    border: "1px solid transparent",
                    borderImage: "linear-gradient(to right, #22c55e, transparent) 1",
                  }}
                  animate={{
                    borderImage: [
                      "linear-gradient(to right, #22c55e, transparent) 1",
                      "linear-gradient(to right, transparent, #22c55e) 1",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <h2 className="text-green-300 text-lg font-bold mb-2">
                  -- THE CAESAR CIPHER --
                </h2>
                <p className="mb-4 text-green-400 text-sm sm:text-base">
                  The Caesar cipher is one of the earliest encryption techniques,
                  dating back to Julius Caesar who used it to communicate with his generals.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <motion.div 
                    className="bg-gradient-to-br from-black to-gray-900 bg-opacity-80 p-3 rounded border border-green-700 relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded pointer-events-none"
                      style={{ border: "1px solid #22c55e" }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="text-green-500 mb-2 text-sm">$ man caesar_cipher</div>
                    <p className="text-gray-300 mb-2 text-xs sm:text-sm">
                      Each letter is shifted a fixed number of positions down the alphabet:
                    </p>
                    <div className="text-gray-400 text-xs">
                      <div>A → D (shift 3)</div>
                      <div>B → E (shift 3)</div>
                      <div>Z → C (shift 3)</div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="bg-gradient-to-br from-black to-gray-900 bg-opacity-80 p-3 rounded border border-green-700 relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded pointer-events-none"
                      style={{ border: "1px solid #22c55e" }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="text-green-500 mb-2 text-sm">
                      $ echo "HELLO" | ./caesar.sh -s 3
                    </div>
                    <div className="text-gray-300 mb-1 text-xs sm:text-sm">
                      Input: <span className="text-blue-300">HELLO</span>
                    </div>
                    <div className="text-gray-300 mb-1 text-xs sm:text-sm">
                      Output: <span className="text-green-300">KHOOR</span>
                    </div>
                    <div className="mt-2 text-gray-400 text-xs border-t border-green-900 pt-2">
                      shift('H') → 'K'<br />
                      shift('E') → 'H'<br />
                      shift('L') → 'O'<br />
                      shift('L') → 'O'<br />
                      shift('O') → 'R'
                    </div>
                  </motion.div>
                </div>
                <p className="mb-4 text-green-400 text-sm sm:text-base">
                  The target message is encrypted using a Caesar cipher with shift=3.
                  This simple algorithm represents the foundation of modern cryptography.
                </p>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(34,197,94,0.7)",
                    background: "linear-gradient(45deg, #16a34a, #22c55e)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    borderColor: ["#22c55e", "#16a34a", "#22c55e"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  onClick={() => setShowExplanation(false)}
                  className="mt-2 w-full sm:w-auto bg-gradient-to-r from-green-800 to-green-700 text-green-100 font-bold py-2 px-4 rounded border-2 border-green-600 transition-colors duration-300 text-sm sm:text-base relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        "linear-gradient(45deg, rgba(34,197,94,0.2), transparent)",
                        "linear-gradient(45deg, transparent, rgba(34,197,94,0.2))",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  $ ./start_demo.sh
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {!showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
            >
              <div className="text-green-400 mb-2 text-sm sm:text-base">
                [SEU-SECURITY]$ cat encrypted_message.txt
              </div>
              <motion.div 
                className="bg-gradient-to-br from-black to-gray-900 p-3 rounded border border-green-800 mb-4 text-xs sm:text-sm break-words relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 rounded pointer-events-none"
                  style={{ border: "1px solid #22c55e" }}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                {encryptedMessage}
              </motion.div>

              {!decryptionComplete && !decrypting && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="flex flex-col items-center"
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(34,197,94,0.8)",
                      background: "linear-gradient(45deg, #16a34a, #22c55e)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      borderColor: ["#22c55e", "#16a34a", "#22c55e"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    onClick={startDecryption}
                    className="w-full sm:w-auto bg-gradient-to-r from-black to-gray-900 text-green-500 font-bold py-2 px-4 border-2 border-green-600 rounded shadow-lg transition-all duration-300 text-sm sm:text-base relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: [
                          "linear-gradient(45deg, rgba(34,197,94,0.2), transparent)",
                          "linear-gradient(45deg, transparent, rgba(34,197,94,0.2))",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    Start Decrypting...
                  </motion.button>
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="mt-2 text-green-400 text-xs"
                  >
                    Click the button above
                  </motion.span>
                </motion.div>
              )}

              {decrypting && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mb-6"
                >
                  <AnimatePresence>
                    {typingIndex > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-green-400 mb-1 text-sm"
                      >
                        [SEU-SECURITY]$ {terminalCommands[0]}
                      </motion.div>
                    )}
                    {typingIndex > 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-yellow-500 mb-1 text-sm"
                      >
                        {terminalCommands[1]}
                      </motion.div>
                    )}
                    {typingIndex > 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="text-yellow-500 mb-3 text-sm">
                          {terminalCommands[2]}
                        </div>
                        <div className="mb-2 text-gray-400 text-sm">
                          Decrypting cipher: <span className="text-green-400">[{progress}%]</span>
                        </div>
                        <motion.div
                          className="w-full bg-gray-900 rounded-sm h-2 mb-4 border border-green-900 overflow-hidden relative"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.div
                            className="absolute inset-0"
                            style={{ border: "1px solid #22c55e" }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <motion.div
                            className="bg-gradient-to-r from-green-600 to-green-400 h-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ boxShadow: "inset 0 0 10px rgba(34,197,94,0.5)" }}
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {(decrypting && typingIndex > 2) || decryptionComplete ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="mt-6"
                >
                  <div className="text-green-400 mb-2 text-sm sm:text-base">
                    [SEU-SECURITY]$ cat decrypted_output.txt
                  </div>
                  <motion.div 
                    className="bg-gradient-to-br from-black to-gray-900 p-3 rounded border border-green-800 min-h-16 text-sm sm:text-base break-words relative"
                    initial={{ scale: 0.98 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded pointer-events-none"
                      style={{ border: "1px solid #22c55e" }}
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <span className="text-green-400">{decryptedText}</span>
                    {!decryptionComplete && cursorVisible && (
                      <motion.span
                        animate={{ opacity: [1, 0], scale: [1, 1.2] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="text-green-500"
                      >
                        ▋
                      </motion.span>
                    )}
                  </motion.div>
                </motion.div>
              ) : null}

              {decryptionComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                  className="mt-6 p-4 bg-gradient-to-br from-green-900 to-green-800 bg-opacity-20 rounded-lg relative"
                >
                  <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{ border: "1px solid #22c55e" }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="text-green-500 mb-2 text-sm sm:text-base">
                    [SEU-SECURITY]$ ./validation.sh --success
                  </div>
                  <div className="text-green-400 text-sm sm:text-base">
                    Decryption successful! Authentication complete.
                  </div>
                  <div className="text-green-300 my-2 text-sm sm:text-base">
                    Thank you for participating in our security demonstration.
                    Proceed to visitor check-in terminal.
                  </div>
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(34,197,94,0.7)",
                      background: "linear-gradient(45deg, #16a34a, #22c55e)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      borderColor: ["#22c55e", "#16a34a", "#22c55e"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    onClick={resetDemo}
                    className="mt-3 w-full sm:w-auto bg-gradient-to-r from-green-800 to-green-700 text-green-100 font-bold py-2 px-4 rounded border-2 border-green-600 transition-colors duration-300 text-sm sm:text-base relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: [
                          "linear-gradient(45deg, rgba(34,197,94,0.2), transparent)",
                          "linear-gradient(45deg, transparent, rgba(34,197,94,0.2))",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    $ ./reset_demo.sh
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-gray-500 text-xs border-t border-green-900 pt-3 mt-6 relative"
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ borderTop: "1px solid #22c55e" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div>SEU-SECURITY-CONSOLE v3.4.2 | Computing Security Department</div>
            <div>© 2025 SEU University | Type 'help' for available commands</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CipherDecryptor;