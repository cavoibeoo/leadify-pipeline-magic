
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { GitBranch, MoreHorizontal } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const LogicNode = memo(({ data }: { data: { label: string } }) => {
  return (
    <Card className="min-w-[180px]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4" />
            <span className="font-medium">{data.label}</span>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Condition Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Configure your if/else condition.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="condition">Condition</Label>
                    <Input
                      id="condition"
                      placeholder="Enter condition"
                      className="col-span-2"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Handle type="target" position={Position.Left} className="w-2 h-2" />
        <Handle type="source" position={Position.Right} className="w-2 h-2" label="True" />
        <Handle type="source" position={Position.Bottom} className="w-2 h-2" label="False" />
      </CardContent>
    </Card>
  );
});

LogicNode.displayName = 'LogicNode';
