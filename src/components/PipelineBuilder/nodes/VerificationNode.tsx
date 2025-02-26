
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { CheckCircle, Phone } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const icons = {
  'pre-verify': CheckCircle,
  'call': Phone,
};

export const VerificationNode = memo(({ data }: { data: { label: string; action: keyof typeof icons } }) => {
  const Icon = icons[data.action] || CheckCircle;

  return (
    <Card className="min-w-[180px]">
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          <span className="font-medium">{data.label}</span>
        </div>
        <Handle type="target" position={Position.Left} className="w-2 h-2" />
        <Handle type="source" position={Position.Right} className="w-2 h-2" />
      </CardContent>
    </Card>
  );
});

VerificationNode.displayName = 'VerificationNode';
