import { useEffect, useState, useRef } from 'react';
import { getAuthData, getMessages, saveMessage, getConversationsForUser } from '../../utils/localStorage';
import { FiSend } from 'react-icons/fi';

const ChatDonatur = () => {
  const user = getAuthData();
  const [conversations, setConversations] = useState([]);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedPeer) {
      const all = getMessages();
      const thread = all.filter(m => (String(m.from) === String(user.id) && String(m.to) === String(selectedPeer)) || (String(m.to) === String(user.id) && String(m.from) === String(selectedPeer)));
      setMessages(thread.sort((a,b)=> new Date(a.createdAt) - new Date(b.createdAt)));
      // scroll to bottom
      setTimeout(()=> scrollToBottom(), 50);
    }
  }, [selectedPeer]);

  const loadConversations = () => {
    if (!user || !user.id) return;
    const conv = getConversationsForUser(user.id);
    // sort by lastMessage time desc
    conv.sort((a,b)=> new Date(b.lastMessage?.createdAt || 0) - new Date(a.lastMessage?.createdAt || 0));
    setConversations(conv);
    if (conv.length > 0 && !selectedPeer) setSelectedPeer(conv[0].peerId);
  };

  const handleSelect = (peerId) => {
    setSelectedPeer(peerId);
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (!text.trim() || !selectedPeer) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      from: user.id,
      to: selectedPeer,
      text: text.trim(),
      createdAt: new Date().toISOString()
    };

    saveMessage(newMsg);
    setText('');
    // update messages state and conversations
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    loadConversations();
    setTimeout(()=> scrollToBottom(), 50);
  };

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  if (!user || !user.id) {
    return <div className="p-6">Silakan login untuk mengakses chat.</div>;
  }

  return (
    <div className="p-6 flex gap-6 min-h-[60vh]">
      {/* Left: Conversation list */}
      <aside className="w-72 bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3">Percakapan</h3>
        <div className="space-y-2 max-h-[60vh] overflow-auto">
          {conversations.length === 0 && <div className="text-sm text-gray-500">Belum ada percakapan.</div>}
          {conversations.map((c) => (
            <button key={c.peerId} onClick={() => handleSelect(c.peerId)} className={`w-full text-left p-3 rounded-lg transition-colors ${String(selectedPeer)===String(c.peerId) ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white' : 'hover:bg-gray-100'}`}>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-sm">User {c.peerId}</div>
                <div className="text-xs text-gray-300">{c.lastMessage ? new Date(c.lastMessage.createdAt).toLocaleTimeString('id-ID') : ''}</div>
              </div>
              <div className="text-xs mt-1 truncate">{c.lastMessage?.text || '-'}</div>
            </button>
          ))}
        </div>
      </aside>

      {/* Right: Messages */}
      <section className="flex-1 flex flex-col bg-white rounded-xl shadow">
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold">Chat dengan: {selectedPeer ? `User ${selectedPeer}` : '-'}</h3>
        </div>

        <div className="flex-1 p-4 overflow-auto" ref={listRef} style={{ background: '#F7FAFC' }}>
          {(!selectedPeer || messages.length===0) && <div className="text-sm text-gray-500">Pilih percakapan atau mulai pesan baru.</div>}
          {messages.map((m) => (
            <div key={m.id} className={`mb-3 flex ${String(m.from) === String(user.id) ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] px-4 py-2 rounded-xl ${String(m.from) === String(user.id) ? 'bg-[#007EFF] text-white' : 'bg-white text-gray-800 shadow'}`}>
                <div className="text-sm">{m.text}</div>
                <div className="text-xs text-white/60 mt-1 text-right">{new Date(m.createdAt).toLocaleString('id-ID')}</div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-4 border-t flex items-center gap-3">
          <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Tulis pesan..." className="flex-1 px-4 py-3 border rounded-xl" />
          <button type="submit" className="inline-flex items-center px-4 py-3 bg-[#007EFF] text-white rounded-xl">
            <FiSend />
          </button>
        </form>
      </section>
    </div>
  );
};

export default ChatDonatur;
