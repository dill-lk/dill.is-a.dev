import React from 'react';
import * as LucideIcons from 'lucide-react';

interface TestimonialsTabProps {
    data: any[];
    onChange: (newData: any[]) => void;
}

const TestimonialsTab: React.FC<TestimonialsTabProps> = ({ data, onChange }) => {
    const addTestimonial = () => {
        const newItem = {
            id: Date.now().toString(),
            quote: 'Amazing work! Highly recommended.',
            author: 'John Doe',
            title: 'CEO at Company',
            avatar: 'https://i.pravatar.cc/150?img=1'
        };
        onChange([newItem, ...data]);
    };

    const updateItem = (id: string, field: string, value: any) => {
        onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const deleteItem = (id: string) => {
        onChange(data.filter(item => item.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-white font-bold text-lg">Testimonials</h3>
                    <p className="text-white/40 text-xs">Client reviews and recommendations</p>
                </div>
                <button
                    onClick={addTestimonial}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                >
                    <LucideIcons.Plus size={14} />
                    Add Testimonial
                </button>
            </div>

            <div className="space-y-4">
                {data.map((item) => (
                    <div key={item.id} className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4">
                        <div className="flex items-start gap-4">
                            <img
                                src={item.avatar}
                                alt={item.author}
                                className="w-12 h-12 rounded-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70);
                                }}
                            />
                            <div className="flex-1 space-y-3">
                                <textarea
                                    value={item.quote}
                                    onChange={(e) => updateItem(item.id, 'quote', e.target.value)}
                                    className="w-full bg-white/5 rounded-xl p-3 text-sm text-white/90 outline-none focus:border-blue-500/50 border border-white/5 resize-none"
                                    rows={3}
                                    placeholder="Quote text..."
                                />
                                <div className="grid grid-cols-3 gap-3">
                                    <input
                                        value={item.author}
                                        onChange={(e) => updateItem(item.id, 'author', e.target.value)}
                                        className="bg-white/5 rounded-lg p-2 text-xs text-white outline-none"
                                        placeholder="Name"
                                    />
                                    <input
                                        value={item.title}
                                        onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                                        className="bg-white/5 rounded-lg p-2 text-xs text-white outline-none"
                                        placeholder="Title"
                                    />
                                    <input
                                        value={item.avatar}
                                        onChange={(e) => updateItem(item.id, 'avatar', e.target.value)}
                                        className="bg-white/5 rounded-lg p-2 text-xs text-white/70 outline-none"
                                        placeholder="Avatar URL"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => deleteItem(item.id)}
                                className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                            >
                                <LucideIcons.Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimonialsTab;
