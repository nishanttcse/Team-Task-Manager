import { useEffect, useState, useRef } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const hasFetched = useRef(false);

  // 🚀 Load tasks once (StrictMode safe)
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const loadTasks = async () => {
      try {
        const res = await API.get("/tasks");
        setTasks(res.data.tasks);
        setStats(res.data.stats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // ➕ Create task
  const createTask = async () => {
    if (!title.trim()) return;

    try {
      const res = await API.post("/tasks", { title });

      setTasks((prev) => [...prev, res.data]);

      setStats((prev) => ({
        ...prev,
        total: (prev.total || 0) + 1,
        pending: (prev.pending || 0) + 1,
      }));

      setTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  // 🔄 Update task status
  const updateStatus = async (id, status) => {
    try {
      const res = await API.put(`/tasks/${id}`, { status });

      const updatedTasks = tasks.map((t) =>
        t._id === id ? res.data : t
      );

      setTasks(updatedTasks);

      // recalc stats
      setStats({
        total: updatedTasks.length,
        completed: updatedTasks.filter(t => t.status === "completed").length,
        pending: updatedTasks.filter(t => t.status === "pending").length,
        overdue: updatedTasks.filter(
          t => t.dueDate && new Date(t.dueDate) < new Date()
        ).length,
      });

    } catch (err) {
      console.error(err);
    }
  };

  // 🧠 AI suggestion
  const suggestTask = () => {
    const suggestions = [
      "Finish project report",
      "Review pending tasks",
      "Prepare meeting notes",
      "Update project status",
      "Plan next sprint",
    ];

    const random =
      suggestions[Math.floor(Math.random() * suggestions.length)];

    setTitle(random);
  };

  // 🔐 Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // 📊 Chart data
  const chartData = [
    { name: "Completed", value: stats.completed || 0 },
    { name: "Pending", value: stats.pending || 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🚀 Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          Total: {stats.total || 0}
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          Completed: {stats.completed || 0}
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          Pending: {stats.pending || 0}
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          Overdue: {stats.overdue || 0}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded shadow mb-6 w-fit">
        <PieChart width={300} height={300}>
          <Pie data={chartData} dataKey="value" outerRadius={100}>
            <Cell fill="#22c55e" />
            <Cell fill="#facc15" />
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Add Task */}
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createTask}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Add
        </button>

        <button
          onClick={suggestTask}
          className="bg-purple-500 text-white px-4 rounded"
        >
          AI Suggest
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((t) => (
          <div
            key={t._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <span>{t.title}</span>

            <select
              className="border rounded p-1"
              value={t.status}
              onChange={(e) =>
                updateStatus(t._id, e.target.value)
              }
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        ))}
      </div>

    </div>
  );
}