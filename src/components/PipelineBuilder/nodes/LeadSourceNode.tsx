
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Sheet, Database } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const icons = {
  sheets: Sheet,
  facebook: Database,
};

export const LeadSourceNode = memo(({ data }: { data: { label: string; source: keyof typeof icons } }) => {
  const Icon = icons[data.source] || Database;

  return (
    <Card className="min-w-[180px]">
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          <span className="font-medium">{data.label}</span>
        </div>
        <Handle type="source" position={Position.Right} className="w-2 h-2" />
      </CardContent>
    </Card>
  );
});

LeadSourceNode.displayName = 'LeadSourceNode';
