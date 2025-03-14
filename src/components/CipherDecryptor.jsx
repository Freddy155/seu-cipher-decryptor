import React, { useState, useEffect } from "react";

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

  // Terminal typing effect for commands
  const terminalCommands = [
    'sudo ./decrypt_caesar.sh --input="encrypted_message.txt" --shift=3',
    "loading cryptography modules...",
    "initializing decryption algorithm...",
  ];

  // For terminal typing effect
  useEffect(() => {
    if (decrypting && typingIndex < terminalCommands.length) {
      const timer = setTimeout(() => {
        setTypingIndex((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [decrypting, typingIndex, terminalCommands.length]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  const startDecryption = () => {
    setDecrypting(true);
    setProgress(0);
    setDecryptedText("");
    setShowExplanation(false);
    setTypingIndex(0);
  };

  // Decryption progress effect
  useEffect(() => {
    if (
      decrypting &&
      progress < 100 &&
      typingIndex >= terminalCommands.length
    ) {
      const timer = setTimeout(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;

          // Calculate how much of the message to show based on progress
          const charsToShow = Math.floor(
            (newProgress / 100) * decryptedMessage.length
          );
          setDecryptedText(decryptedMessage.substring(0, charsToShow));

          if (newProgress >= 100) {
            setDecryptionComplete(true);
            setDecrypting(false);
          }

          return newProgress;
        });
      }, 40); // Animation speed - lower is faster

      return () => clearTimeout(timer);
    }
  }, [
    decrypting,
    progress,
    typingIndex,
    terminalCommands.length,
    decryptedMessage,
  ]);

  const resetDemo = () => {
    setDecryptionComplete(false);
    setDecryptedText("");
    setShowExplanation(true);
    setTypingIndex(0);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-green-500 font-mono">
      <div className="max-w-3xl w-full bg-gray-900 rounded-lg shadow-xl border border-green-800 p-2 relative overflow-hidden">
        <div className="bg-gray-800 p-2 rounded-t-md flex items-center space-x-2 border-b border-green-900">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <div className="ml-2 text-gray-400 flex-1 text-center text-sm">
            seu-university@terminal:~/security-demo
          </div>
        </div>

        <div className="p-4 relative z-10 overflow-auto h-full max-h-full">
          <div className="mb-2 text-green-400">
            [SEU-SECURITY]$ ./launcher.sh --module=caesar_cipher
          </div>

          <div className="text-green-500 mb-6 text-lg font-bold">
            SEU University Terminal - Security Showcase v2.0.3
          </div>

          {showExplanation && (
            <div className="mb-8 bg-black bg-opacity-70 p-4 rounded border border-green-900">
              <div className="text-green-300 text-lg font-bold mb-2">
                -- THE CAESAR CIPHER --
              </div>

              <p className="mb-4 text-green-400">
                The Caesar cipher is one of the earliest encryption techniques,
                dating back to Julius Caesar who used it to communicate with his
                generals.
              </p>

              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 bg-black bg-opacity-80 p-3 rounded border border-green-700">
                  <div className="text-green-500 mb-2">$ man caesar_cipher</div>
                  <p className="text-gray-300 mb-2">
                    Each letter is shifted a fixed number of positions down the
                    alphabet:
                  </p>
                  <div className="text-gray-400">
                    <div>A → D (shift 3)</div>
                    <div>B → E (shift 3)</div>
                    <div>Z → C (shift 3)</div>
                  </div>
                </div>

                <div className="flex-1 bg-black bg-opacity-80 p-3 rounded border border-green-700">
                  <div className="text-green-500 mb-2">
                    $ echo "HELLO" | ./caesar.sh -s 3
                  </div>
                  <div className="text-gray-300 mb-1">
                    Input: <span className="text-blue-300">HELLO</span>
                  </div>
                  <div className="text-gray-300 mb-1">
                    Output: <span className="text-green-300">KHOOR</span>
                  </div>
                  <div className="mt-2 text-gray-400 text-xs border-t border-green-900 pt-2">
                    shift('H') → 'K'
                    <br />
                    shift('E') → 'H'
                    <br />
                    shift('L') → 'O'
                    <br />
                    shift('L') → 'O'
                    <br />
                    shift('O') → 'R'
                  </div>
                </div>
              </div>

              <p className="mb-4 text-green-400">
                The target message is encrypted using a Caesar cipher with
                shift=3. This simple algorithm represents the foundation of
                modern cryptography.
              </p>

              <div className="text-center">
                <button
                  onClick={() => setShowExplanation(false)}
                  className="mt-2 bg-green-800 hover:bg-green-700 text-green-100 font-bold py-2 px-4 rounded transition-all duration-300"
                >
                  $ ./start_demo.sh
                </button>
              </div>
            </div>
          )}

          <div className="mb-6">
            {!showExplanation && (
              <>
                <div className="text-green-400 mb-2">
                  [SEU-SECURITY]$ cat encrypted_message.txt
                </div>
                <div className="bg-black p-3 rounded border border-green-800 shadow-inner mb-4 text-sm">
                  {encryptedMessage}
                </div>

                {!decryptionComplete && !decrypting && (
                  <div className="flex flex-col items-center">
                    <button
                      onClick={startDecryption}
                      className="relative bg-black text-green-500 font-mono font-bold py-2 px-4 w-full border border-green-600 rounded overflow-hidden shadow-[0_0_10px_rgba(34,197,94,0.7)] hover:shadow-[0_0_20px_rgba(34,197,94,1)] animate-pulse transition-all duration-300 before:content-['[SEU-SECURITY]$'] before:absolute before:left-4 before:whitespace-nowrap before:overflow-hidden before:border-r-2 before:border-green-500 before:pr-2 before:animate-[typing_2s_steps(20,end)_forwards,blink_0.8s_infinite]"
                    >
                      Start Decrypting...
                    </button>
                    <span className="mt-2 text-green-400 text-xs animate-glow">
                      Click the btn avbove
                    </span>
                  </div>
                )}

                {decrypting && (
                  <div className="mb-6">
                    {typingIndex > 0 && (
                      <div className="text-green-400 mb-1">
                        [SEU-SECURITY]$ {terminalCommands[0]}
                      </div>
                    )}

                    {typingIndex > 1 && (
                      <div className="text-yellow-500 mb-1">
                        {terminalCommands[1]}
                      </div>
                    )}

                    {typingIndex > 2 && (
                      <>
                        <div className="text-yellow-500 mb-3">
                          {terminalCommands[2]}
                        </div>
                        <div className="mb-2 text-gray-400">
                          Decrypting cipher:{" "}
                          <span className="text-green-400">[{progress}%]</span>
                        </div>
                        <div className="w-full bg-gray-900 rounded-sm h-1 mb-4 border border-green-900">
                          <div
                            className="bg-green-600 h-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {(decrypting && typingIndex > 2) || decryptionComplete ? (
                  <div className="mt-6">
                    <div className="text-green-400 mb-2">
                      [SEU-SECURITY]$ cat decrypted_output.txt
                    </div>
                    <div className="bg-black p-3 rounded border border-green-800 shadow-inner relative overflow-hidden min-h-16">
                      <span className="text-green-400">{decryptedText}</span>
                      {!decryptionComplete && cursorVisible && (
                        <span className="text-green-500">▋</span>
                      )}
                    </div>
                  </div>
                ) : null}

                {decryptionComplete && (
                  <div className="mt-6 p-3 bg-green-900 bg-opacity-20 border border-green-700 rounded">
                    <div className="text-green-500 mb-2">
                      [SEU-SECURITY]$ ./validation.sh --success
                    </div>
                    <div className="text-green-400">
                      Decryption successful! Authentication complete.
                    </div>
                    <div className="text-green-300 my-2">
                      Thank you for participating in our security demonstration.
                      Proceed to visitor check-in terminal.
                    </div>
                    <button
                      onClick={resetDemo}
                      className="mt-3 bg-green-800 hover:bg-green-700 text-green-100 font-bold py-1 px-3 rounded transition-all duration-300 text-sm"
                    >
                      $ ./reset_demo.sh
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="text-gray-500 text-xs border-t border-green-900 pt-3 mt-4">
            <div>
              SEU-SECURITY-CONSOLE v3.4.2 | Computing Security Department
            </div>
            <div>
              © 2025 SEU University | Type 'help' for available commands
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CipherDecryptor;
