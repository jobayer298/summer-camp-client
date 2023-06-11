import React from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const FeedBack = () => {
    const {id} = useParams()
  const sendFeedback = (event) => {
    event.preventDefault();
    const feedback = event.target.feedback.value;
    console.log(feedback);
    fetch(`http://localhost:5000/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({feedback}),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          text: "feedback given!",
        });
        console.log(data);
      });
  };
  return (
    <div className="w-1/2 mx-auto text-center">
      <h2 className="text-center font-medium text-5xl mt-10">
        Give <span className="text-[#e2554a]">Feedback</span>
      </h2>
      <form onSubmit={sendFeedback}>
        <textarea
          className="textarea textarea-secondary mt-3 w-full"
          placeholder="feedback"
          name="feedback"
          required
        ></textarea>
        <button className="btn btn-secondary mt-3 ">Feedback</button>
      </form>
    </div>
  );
};

export default FeedBack;
