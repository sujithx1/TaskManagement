import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {

    const navigate=useNavigate()
    const handleNavigate=()=>{
        navigate('/login')
    }
  return (
    <div className="min-vh-100 bg-light p-5 position-relative overflow-hidden">
      

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container text-center position-relative"
      >
        <h1 className="display-4 fw-bold text-primary mb-4">
          <span className="d-inline-flex align-items-center gap-2">
            <Sparkles className="me-2 text-warning animate__animated animate__pulse" size={32} />
            Manage Your Tasks Effortlessly
          </span>
        </h1>
        <p className="lead text-secondary mb-4">
          Organize, prioritize, and track your daily tasks with our smart, minimal task management tool.
        </p>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <button className="btn btn-primary btn-lg shadow" onClick={handleNavigate} >Get Started</button>
          <button className="btn btn-outline-primary btn-lg" onClick={handleNavigate}>Learn More</button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="container mt-5 position-relative"
      >
        <div className="row g-4">
          {[
            {
              title: "Create Tasks",
              desc: "Add tasks with deadlines and priorities easily.",
              img: "https://cdn-icons-png.flaticon.com/512/3595/3595455.png"
            },
            {
              title: "Track Progress",
              desc: "Mark tasks as complete and see your progress.",
              img: "https://cdn-icons-png.flaticon.com/512/833/833472.png"
            },
            {
              title: "Stay Notified",
              desc: "Get reminders for due and upcoming tasks.",
              img: "https://cdn-icons-png.flaticon.com/512/3602/3602123.png"
            },
          ].map((feature, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100 shadow-sm border-0 text-center">
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="mx-auto my-3"
                  style={{ width: "64px", height: "64px" }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-semibold text-dark">{feature.title}</h5>
                  <p className="card-text text-muted">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
