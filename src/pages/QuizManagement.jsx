import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHandleFetch from "../Utilities/useHandleFetch";
import UnAuthenticatedException from "../Exceptions/UnAuthenticatedException";

function QuizManagement() {
  const [toggleModal, setToggleModal] = useState(false);

  const [toggleEditModal, setToggleEditModal] = useState(false);

  const [editableGroupId, setEditableGroupId] = useState("");

  const [editableGroupData, setEditableGroupData] = useState({
    groupName: "",
    description: "",
    isActive: false,
    isArchived: false,
    activeForDays: 0,
    examDuration: 0
  });

  const [allGroups, setAllGroups] = useState({ records: [], meta: {} });

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [activeForDays, setActiveForDays] = useState(0);
  const [examDuration, setExamDuration] = useState(0);
  const [authData, setAuthData] = useState({});
  const navigate = useNavigate();
  const handleFetch = useHandleFetch();

  const GROUPS_URL = import.meta.env.VITE_GROUPS_URL;

  async function submitQuestionGroupData() {
    let group = { groupName, description, isActive, activeForDays, examDuration };

    await handleFetch(async () => {
      const authData = localStorage.getItem("authData");

      if (authData === null) {
        throw new UnAuthenticatedException("Please login.", 401);
      }

      const parsedData = JSON.parse(authData);
      await fetch(GROUPS_URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${parsedData.accessToken}`
        },
        body: JSON.stringify(group)
      });
    }, null);
    await handleFetch(async () => {
      const authData = localStorage.getItem("authData");

      if (authData === null) {
        throw new UnAuthenticatedException("Please login.", 401);
      }

      const parsedData = JSON.parse(authData);
      await fetch(GROUPS_URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${parsedData.accessToken}`
        },
        body: JSON.stringify(group)
      });
    }, null);

    setToggleModal(false);
  }

  async function submitEditableQuestionGroupData(groupId) {
    console.log(`${GROUPS_URL}/${groupId}`);
    await fetch(`${GROUPS_URL}/${groupId}`, {
      method: 'PUT',
      headers:{
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${authData.accessToken}`
      },
      body: JSON.stringify(editableGroupData)
    });

    setToggleEditModal(false);
  }

  async function getAllGroupData(authToken) {

    let response = await fetch(`${GROUPS_URL}?page=1&perPage=10`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    });
    let data = await response.json();

    setAllGroups(data);
  }

  async function DeleteQuestionGroup(groupId) {
    await fetch(`${GROUPS_URL}/${groupId}`, {
      method: 'DELETE',
      headers:{
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${authData.accessToken}`
      }
    });

    getAllGroupData();
  }

  async function fetchGroupDataByGroupId(groupId) {
    let response = await fetch(`${GROUPS_URL}/${groupId}`,{
      headers:{
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${authData.accessToken}`
      }
    });
    let data = await response.json();

    const resolvedGroup = data?.record ?? data?.data ?? data;

    setEditableGroupData({
      groupName: resolvedGroup?.groupName ?? "",
      description: resolvedGroup?.description ?? "",
      isActive: resolvedGroup?.isActive ?? false,
      isArchived: resolvedGroup?.isArchived ?? false,
      activeForDays: resolvedGroup?.activeForDays ?? 0,
      examDuration: resolvedGroup?.examDuration ?? 0,
    });
  }

  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      const parsedData = JSON.parse(authData);
      setAuthData(parsedData);
      getAllGroupData(parsedData?.accessToken);
    }
    else {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#f8fafc] text-[#1e293b] font-sans antialiased min-h-screen" x-data="{ openModal: false }">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0f172a] tracking-tight">Quiz Management</h1>
            <p className="text-slate-500 mt-1 text-sm sm:text-base max-w-2xl">Manage your curriculum assessments, monitor real-time student submissions, and analyze performance data across all your active courses.</p>
          </div>
          <button
            onClick={() => setToggleModal(true)}
            className="inline-flex items-center justify-center bg-[#4355b4] hover:bg-[#374699] text-white font-medium text-sm px-5 py-3 rounded-xl shadow-sm transition-colors duration-200 self-start md:self-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            Create New Quiz
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#f0f4ff]/60 border border-[#e2eaff] rounded-2xl p-6 shadow-sm">
            <p className="text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">Total Quizzes</p>
            <p className="text-4xl font-extrabold text-[#31439c]">24</p>
          </div>
          <div className="bg-[#f0fbf7]/70 border border-[#e0f5ed] rounded-2xl p-6 shadow-sm">
            <p className="text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">Active Today</p>
            <p className="text-4xl font-extrabold text-[#0f766e]">8</p>
          </div>
          <div className="bg-[#f5f3ff]/60 border border-[#ebe5ff] rounded-2xl p-6 shadow-sm">
            <p className="text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">Total Submissions</p>
            <p className="text-4xl font-extrabold text-[#4f46e5]">1,402</p>
          </div>
          <div className="bg-[#fffbeb]/70 border border-[#fef3c7] rounded-2xl p-6 shadow-sm">
            <p className="text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">Avg. Score</p>
            <p className="text-4xl font-extrabold text-[#b45309]">78%</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc]/80 border-b border-slate-100 text-[13px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6 min-w-[280px]">Title</th>
                  <th className="py-4 px-6">Date Created</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {allGroups.records.length > 0 && allGroups.records.map((elem) => (
                  <tr className="hover:bg-slate-50/50 transition-colors" key={elem.groupId}>
                    <td className="py-4 px-6 flex items-center gap-4">
                      <div>
                        <p className="font-semibold text-slate-900 leading-tight">{elem.groupName}</p>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">{elem.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-medium">{elem.createdAt}</td>
                    <td className="py-4 px-6">
                      {elem.isActive && (
                        <span className="inline-flex items-center bg-[#0f766e] text-[10px] font-extrabold text-emerald-50 tracking-wider uppercase px-2.5 py-1 rounded-md">Active</span>
                      )}
                      {!elem.isActive && (
                        <span className="inline-flex items-center bg-slate-600 text-[10px] font-extrabold text-slate-50 tracking-wider uppercase px-2.5 py-1 rounded-md">Inactive</span>
                      )}
                      {elem.isArchived && (
                        <span className="inline-flex items-center bg-amber-700 text-[10px] font-extrabold text-amber-50 tracking-wider uppercase px-2.5 py-1 rounded-md">Archived</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-slate-500 hover:text-[#4355b4] hover:bg-indigo-50 rounded-xl transition-all duration-200" title="Edit Quiz"
                          onClick={async () => {
                            setToggleEditModal(true);
                            setEditableGroupId(elem.groupId);
                            await fetchGroupDataByGroupId(elem.groupId);
                          }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200" title="Delete Quiz"
                          onClick={() => DeleteQuestionGroup(elem.groupId)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200" title="Archive Quiz">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {allGroups.records.length === 0 && (
                  <tr>
                    {/* 💡 IMPORTANT: Set colSpan to the exact number of columns your <th> header has */}
                    <td colSpan={5} className="px-6 py-12 text-center bg-white rounded-b-2xl border-b border-slate-100">
                      <div className="flex flex-col items-center justify-center max-w-sm mx-auto space-y-3">

                        {/* Subtle Document/Search Empty State Icon */}
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        </div>

                        {/* Context Messages */}
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-slate-800">No quizzes found</h4>
                          <p className="text-xs text-slate-400 font-medium leading-relaxed">
                            Currently, you don't have any quiz structures assigned to your profile pool.
                          </p>
                        </div>

                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {allGroups.records.length > 0 && (
            <div className="bg-slate-50/70 border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row justify-center items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <button className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
                <button className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {toggleModal && <div
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
        >
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">Create New Quiz</h3>
              <button
                onClick={() => setToggleModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Quiz Title</label>
                <input type="text" placeholder="e.g. Organic Chemistry Foundations" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#4355b4] focus:ring-1 focus:ring-[#4355b4]" required value={groupName} onChange={(e) => setGroupName(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Description</label>
                  <input type="text" placeholder="e.g. small description ..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#4355b4] focus:ring-1 focus:ring-[#4355b4]" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
              </div>
              {/* New Active Status Fields */}
              <div className="grid grid-cols-2 gap-4 items-end pt-1">
                {/* Is Active Toggle Switch */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Is Active</label>
                  <label className="relative inline-flex items-center cursor-pointer group">
                    <input type="checkbox" className="sr-only peer" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4355b4]"></div>
                  </label>
                </div>

                {/* Active For Days Integer Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Active For (Days)</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 7"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#4355b4] focus:ring-1 focus:ring-[#4355b4]"
                    value={activeForDays}
                    onChange={(e) => setActiveForDays(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Exam Duration (Minutes)</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 20"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#4355b4] focus:ring-1 focus:ring-[#4355b4]"
                    value={examDuration}
                    onChange={(e) => setExamDuration(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button onClick={() => setToggleModal(false)} type="button" className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors">Cancel</button>
                <button type="button" className="bg-[#4355b4] hover:bg-[#374699] text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
                  onClick={() => {
                    setToggleModal(false);
                    submitQuestionGroupData();
                  }}>Save</button>
              </div>
            </form>
          </div>
        </div>}

        {toggleEditModal && <div
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
        >
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">Edit New Quiz</h3>
              <button
                onClick={() => setToggleEditModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Quiz Title</label>
                <input type="text" placeholder="e.g. Organic Chemistry Foundations" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#4355b4] focus:ring-1 focus:ring-[#4355b4]" required value={editableGroupData.groupName}
                  onChange={(e) => setEditableGroupData({ ...editableGroupData, groupName: e.target.value })} />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Description</label>
                  <input type="text" placeholder="e.g. small description ..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#4355b4] focus:ring-1 focus:ring-[#4355b4]" value={editableGroupData.description} onChange={(e) => setEditableGroupData({ ...editableGroupData, description: e.target.value })} />
                </div>
              </div>
              {/* New Active Status Fields */}
              <div className="grid grid-cols-2 gap-4 items-end pt-1">
                {/* Is Active Toggle Switch */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Is Active</label>
                  <label className="relative inline-flex items-center cursor-pointer group">
                    <input type="checkbox" className="sr-only peer" checked={editableGroupData.isActive}
                      onChange={(e) => setEditableGroupData({ ...editableGroupData, isActive: !editableGroupData.isActive })} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4355b4]"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Is Archived</label>
                  <label className="relative inline-flex items-center cursor-pointer group">
                    <input type="checkbox" className="sr-only peer" checked={editableGroupData.isArchived}
                      onChange={(e) => setEditableGroupData({ ...editableGroupData, isArchived: !editableGroupData.isArchived })} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4355b4]"></div>
                  </label>
                </div>

                {/* Active For Days Integer Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Active For (Days)</label>
                  <input
                    type="number"
                    placeholder="e.g. 7"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#4355b4] focus:ring-1 focus:ring-[#4355b4]"
                    value={editableGroupData.activeForDays}
                    onChange={(e) => setEditableGroupData({ ...editableGroupData, activeForDays: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Exam Duration (Minutes)</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 20"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#4355b4] focus:ring-1 focus:ring-[#4355b4]"
                    value={editableGroupData.examDuration}
                    onChange={(e) => setEditableGroupData({ ...editableGroupData, examDuration: e.target.value })}
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button onClick={() => setToggleEditModal(false)} type="button" className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors">Cancel</button>
                <button type="button" className="bg-[#4355b4] hover:bg-[#374699] text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
                  onClick={() => {
                    setToggleEditModal(false);
                    submitEditableQuestionGroupData(editableGroupId);
                  }}>Save</button>
              </div>
            </form>
          </div>
        </div>}

      </div>
    </>);
}

export default QuizManagement;