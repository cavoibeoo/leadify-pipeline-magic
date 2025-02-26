
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { FileSpreadsheet } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export const ExportNode = memo(({ data }: { data: { label: string } }) => {
  return (
    <Card className="min-w-[180px]">
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4" />
          <span className="font-medium">{data.label}</span>
        </div>
        <Handle type="target" position={Position.Left} className="w-2 h-2" />
        <Handle type="target" position={Position.Top} className="w-2 h-2" />
        <Handle type="target" position={Position.Bottom} className="w-2 h-2" />
      </CardContent>
    </Card>
  );
});

ExportNode.displayName = 'ExportNode';
