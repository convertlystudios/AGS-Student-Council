"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";
import { Plus, Trash2, User } from "lucide-react";
import { lusitana } from '@/app/ui/fonts';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* -------------------------------- data -------------------------------- */

const DIVISIONS = [
  { name: "President", color: "text-red-600" },
  { name: "Vice President", color: "text-orange-600" },
  { name: "Secretary", color: "text-yellow-600" },
  { name: "Treasurer", color: "text-green-600" },
  { name: "Division 1", color: "text-teal-600" },
  { name: "Division 2", color: "text-cyan-600" },
  { name: "Division 3", color: "text-sky-600" },
  { name: "Division 4", color: "text-blue-600" },
  { name: "Division 5", color: "text-indigo-600" },
  { name: "Division 6", color: "text-violet-600" },
  { name: "Division 7", color: "text-purple-600" },
  { name: "Division 8", color: "text-fuchsia-600" },
  { name: "Division 9", color: "text-pink-600" },
  { name: "Division 10", color: "text-rose-600" },
];

interface Task {
  id: string;
  text: string;
  division: string;
}

/* -------------------------------- page -------------------------------- */

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("President");

  /* ----------------------------- data sync ----------------------------- */

  const fetchTasks = async () => {
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setTasks(data);
  };

  useEffect(() => {
    fetchTasks();

    const channel = supabase
      .channel("kanban-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        fetchTasks
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /* ----------------------------- actions ----------------------------- */

  const addTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await supabase.from("tasks").insert([
      { text: input, division: selectedDivision },
    ]);

    setInput("");
  };

  const deleteTask = async (id: string) => {
    await supabase.from("tasks").delete().eq("id", id);
  };

  /* -------------------------------- UI -------------------------------- */

  return (
    <div className="h-full flex flex-col bg-white text-slate-900">

      <div className="mb-6">
        <h1 className={`${lusitana.className} text-3xl font-bold`}>
          Tasks
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Organize events and tasks within the Student Council with this kanban board.
        </p>
      </div>

      {/* HEADER */}
      <header className="px-8 py-5 border-b border-slate-100">
        <form
          onSubmit={addTask}
          className="flex flex-col md:flex-row gap-3 md:items-center"
        >
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {DIVISIONS.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a task and press +"
            className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 transition"
          >
            <Plus size={16} />
          </button>
        </form>
      </header>

      {/* BOARD */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex h-full px-4">
          {DIVISIONS.map((div) => {
            const columnTasks = tasks.filter(
              (t) => t.division === div.name
            );

            return (
              <div
                key={div.name}
                className="w-80 min-w-[320px] px-3 py-6"
              >
                {/* COLUMN HEADER */}
                <div className="mb-5 flex items-center justify-between">
                  <h3
                    className={`text-xs font-semibold uppercase tracking-wide ${div.color}`}
                  >
                    {div.name}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {columnTasks.length}
                  </span>
                </div>

                {/* TASKS */}
                <div className="space-y-4">
                  {columnTasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm hover:shadow transition"
                    >
                      <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                        {task.text}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                          <User size={12} className="text-slate-400" />
                        </div>

                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-slate-300 hover:text-red-500 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="py-10 text-center text-xs text-slate-400">
                      No tasks yet
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}