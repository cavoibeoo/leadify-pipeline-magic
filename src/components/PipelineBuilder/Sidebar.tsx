
import { Button } from "@/components/ui/button";
import { Save, Edit, RotateCcw } from "lucide-react";

const nodeTemplates = [
  {
    category: 'Lead Sources',
    items: [
      { type: 'leadSource', label: 'Google Sheets', source: 'sheets' },
      { type: 'leadSource', label: 'Facebook Ads', source: 'facebook' },
    ],
  },
  {
    category: 'Verification',
    items: [
      { type: 'verification', label: 'Pre-verify Leads', action: 'pre-verify' },
      { type: 'verification', label: 'Call Lead', action: 'call' },
    ],
  },
  {
    category: 'Actions',
    items: [
      { type: 'action', label: 'Book Calendar', action: 'calendar' },
      { type: 'action', label: 'Send to Webhook', action: 'webhook' },
    ],
  },
  {
    category: 'Export',
    items: [
      { type: 'export', label: 'Export to Sheet' },
    ],
  },
];

export const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeData: any) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <div className="flex gap-2 mb-4">
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="sm">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button variant="outline" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
      <h2 className="text-lg font-semibold mb-4">Pipeline Components</h2>
      {nodeTemplates.map((category) => (
        <div key={category.category} className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">{category.category}</h3>
          <div className="space-y-2">
            {category.items.map((item) => (
              <div
                key={item.label}
                draggable
                onDragStart={(e) => onDragStart(e, item)}
                className="cursor-move"
              >
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  {item.label}
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
};
