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
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6 text-green-500 font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-gray-900 rounded-xl shadow-2xl border border-green-800 p-2 sm:p-4 overflow-hidden"
      >
        <div className="bg-gray-800 p-2 rounded-t-lg flex items-center space-x-2 border-b border-green-900">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <div className="ml-2 text-gray-400 text-sm sm:text-base flex-1 text-center truncate">
            seu-university@terminal:~/security-demo
          </div>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto max-h-[80vh]">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-2 text-green-400 text-sm sm:text-base"
          >
            [SEU-SECURITY]$ ./launcher.sh --module=caesar_cipher
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-green-500 mb-6 text-lg sm:text-xl font-bold"
          >
            SEU University Terminal - Security Showcase v2.0.3
          </motion.h1>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 bg-black bg-opacity-70 p-4 rounded-lg border border-green-900"
              >
                <h2 className="text-green-300 text-lg font-bold mb-2">
                  -- THE CAESAR CIPHER --
                </h2>
                <p className="mb-4 text-green-400 text-sm sm:text-base">
                  The Caesar cipher is one of the earliest encryption techniques,
                  dating back to Julius Caesar who used it to communicate with his generals.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-black bg-opacity-80 p-3 rounded border border-green-700">
                    <div className="text-green-500 mb-2 text-sm">$ man caesar_cipher</div>
                    <p className="text-gray-300 mb-2 text-xs sm:text-sm">
                      Each letter is shifted a fixed number of positions down the alphabet:
                    </p>
                    <div className="text-gray-400 text-xs">
                      <div>A → D (shift 3)</div>
                      <div>B → E (shift 3)</div>
                      <div>Z → C (shift 3)</div>
                    </div>
                  </div>
                  <div className="bg-black bg-opacity-80 p-3 rounded border border-green-700">
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
                  </div>
                </div>
                <p className="mb-4 text-green-400 text-sm sm:text-base">
                  The target message is encrypted using a Caesar cipher with shift=3.
                  This simple algorithm represents the foundation of modern cryptography.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(34,197,94,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowExplanation(false)}
                  className="mt-2 w-full sm:w-auto bg-green-800 hover:bg-green-700 text-green-100 font-bold py-2 px-4 rounded transition-colors duration-300 text-sm sm:text-base"
                >
                  $ ./start_demo.sh
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {!showExplanation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-green-400 mb-2 text-sm sm:text-base">
                [SEU-SECURITY]$ cat encrypted_message.txt
              </div>
              <div className="bg-black p-3 rounded border border-green-800 mb-4 text-xs sm:text-sm break-words">
                {encryptedMessage}
              </div>

              {!decryptionComplete && !decrypting && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34,197,94,0.7)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startDecryption}
                    className="w-full sm:w-auto bg-black text-green-500 font-bold py-2 px-4 border border-green-600 rounded shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                  >
                    Start Decrypting...
                  </motion.button>
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="mt-2 text-green-400 text-xs"
                  >
                    Click the button above
                  </motion.span>
                </motion.div>
              )}

              {decrypting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <AnimatePresence>
                    {typingIndex > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
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
                      >
                        <div className="text-yellow-500 mb-3 text-sm">
                          {terminalCommands[2]}
                        </div>
                        <div className="mb-2 text-gray-400 text-sm">
                          Decrypting cipher: <span className="text-green-400">[{progress}%]</span>
                        </div>
                        <motion.div
                          className="w-full bg-gray-900 rounded-sm h-2 mb-4 border border-green-900 overflow-hidden"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.div
                            className="bg-green-600 h-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
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
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <div className="text-green-400 mb-2 text-sm sm:text-base">
                    [SEU-SECURITY]$ cat decrypted_output.txt
                  </div>
                  <div className="bg-black p-3 rounded border border-green-800 min-h-16 text-sm sm:text-base break-words">
                    <span className="text-green-400">{decryptedText}</span>
                    {!decryptionComplete && cursorVisible && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="text-green-500"
                      >
                        ▋
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              ) : null}

              {decryptionComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-6 p-4 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg"
                >
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
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(34,197,94,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetDemo}
                    className="mt-3 w-full sm:w-auto bg-green-800 hover:bg-green-700 text-green-100 font-bold py-2 px-4 rounded transition-colors duration-300 text-sm sm:text-base"
                  >
                    $ ./reset_demo.sh
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500 text-xs border-t border-green-900 pt-3 mt-6"
          >
            <div>SEU-SECURITY-CONSOLE v3.4.2 | Computing Security Department</div>
            <div>© 2025 SEU University | Type 'help' for available commands</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CipherDecryptor;