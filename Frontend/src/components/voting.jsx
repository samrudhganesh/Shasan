import React, { useState } from "react";

export default function PollCreator() {
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState(["", ""]);
  const [polls, setPolls] = useState([]);
  const [showIdModal, setShowIdModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userId, setUserId] = useState("");
  const [votedUsers, setVotedUsers] = useState({}); // Track votes by poll and user
  const [error, setError] = useState("");

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setOptions(["", ""]); // Reset form when modal closes
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      const updatedOptions = options.filter((_, i) => i !== index);
      setOptions(updatedOptions);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filledOptions = options.filter((opt) => opt.trim() !== "");
    if (filledOptions.length < 2) {
      alert("Please enter at least two options!");
      return;
    }

    // Create poll with vote counts
    const newPoll = {
      options: filledOptions.map((option) => ({ text: option, votes: 0 })),
      id: Date.now(), // Simple poll ID
    };

    setPolls([...polls, newPoll]);
    handleClose();
  };

  const handleVoteClick = (pollIndex, optionIndex) => {
    setSelectedOption({ pollIndex, optionIndex });
    setShowIdModal(true);
    setError("");
    setUserId("");
  };

  const handleVoteSubmit = (e) => {
    e.preventDefault();
    if (!userId.trim()) {
      setError("Please enter a valid user ID");
      return;
    }

    const pollId = polls[selectedOption.pollIndex].id;
    const userKey = `${pollId}-${userId}`;

    // Check if user has already voted for this poll
    if (votedUsers[userKey]) {
      setError("This user ID has already voted on this poll!");
      return;
    }

    // Record the vote
    const updatedPolls = [...polls];
    updatedPolls[selectedOption.pollIndex].options[
      selectedOption.optionIndex
    ].votes += 1;
    setPolls(updatedPolls);

    // Mark user as voted for this poll
    setVotedUsers({
      ...votedUsers,
      [userKey]: true,
    });

    // Close modal and reset
    setShowIdModal(false);
    setSelectedOption(null);
    setUserId("");
    setError("");
  };

  const handleIdModalClose = () => {
    setShowIdModal(false);
    setSelectedOption(null);
    setUserId("");
    setError("");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button
          onClick={handleShow}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            fontSize: "18px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Create Poll
        </button>
      </div>

      {/* Create Poll Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h3 style={{ margin: 0 }}>Create a Poll</h3>
              <button
                onClick={handleClose}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  padding: "0",
                  width: "30px",
                  height: "30px",
                }}
              >
                ×
              </button>
            </div>

            <div onSubmit={handleSubmit}>
              {options.map((option, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    marginBottom: "1rem",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    placeholder={`Enter Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "16px",
                    }}
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      style={{
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        marginLeft: "8px",
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}

              {options.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddOption}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#007bff",
                    cursor: "pointer",
                    marginBottom: "1rem",
                    textDecoration: "underline",
                  }}
                >
                  + Add another option
                </button>
              )}

              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "4px",
                  width: "100%",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Submit Poll
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User ID Modal */}
      {showIdModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h3 style={{ margin: 0 }}>Enter Your Unique ID</h3>
              <button
                onClick={handleIdModalClose}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  padding: "0",
                  width: "30px",
                  height: "30px",
                }}
              >
                ×
              </button>
            </div>

            <div onSubmit={handleVoteSubmit}>
              {error && (
                <div
                  style={{
                    backgroundColor: "#f8d7da",
                    color: "#721c24",
                    padding: "12px",
                    borderRadius: "4px",
                    marginBottom: "1rem",
                    border: "1px solid #f5c6cb",
                  }}
                >
                  {error}
                </div>
              )}

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                  }}
                >
                  User ID
                </label>
                <input
                  type="text"
                  placeholder="Enter your unique identifier"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                  }}
                />
                <small
                  style={{
                    color: "#6c757d",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  Enter a unique ID to cast your vote. Each ID can only vote
                  once per poll.
                </small>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={handleIdModalClose}
                  style={{
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleVoteSubmit}
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  Submit Vote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={{ marginTop: "2rem" }}>
        {polls.length > 0 && (
          <h4 style={{ marginBottom: "1rem" }}>Created Polls:</h4>
        )}
        {polls.map((poll, pollIndex) => (
          <div
            key={pollIndex}
            style={{
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "1rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ padding: "1.5rem" }}>
              <h5 style={{ marginTop: 0, marginBottom: "1rem" }}>
                Poll {pollIndex + 1}
              </h5>
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                {poll.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 16px",
                      borderBottom:
                        optionIndex < poll.options.length - 1
                          ? "1px solid #ddd"
                          : "none",
                    }}
                  >
                    <span>{option.text}</span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: "#007bff",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {option.votes} votes
                      </span>
                      <button
                        onClick={() => handleVoteClick(pollIndex, optionIndex)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#28a745",
                          fontSize: "20px",
                          cursor: "pointer",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          transition: "background-color 0.2s",
                        }}
                        title="Vote for this option"
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#f8f9fa")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                      >
                        ✓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
