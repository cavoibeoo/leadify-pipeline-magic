
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Table, Facebook, MoreHorizontal, Info } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const icons = {
  sheets: Table,
  facebook: Facebook,
};

export const LeadSourceNode = memo(({ data }: { data: { label: string; source: keyof typeof icons } }) => {
  const Icon = icons[data.source] || Table;

  return (
    <Card className="min-w-[180px]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4" />
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
                  <h4 className="font-medium leading-none">Sheet Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Configure your sheet connection.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="sheetId">Sheet ID</Label>
                    <Input
                      id="sheetId"
                      className="col-span-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="updateMethod">Update Method</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-gray-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Polling: Check for updates every few minutes<br/>
                               Webhook: Get instant updates when changes occur</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select defaultValue="polling">
                      <SelectTrigger className="col-span-2">
                        <SelectValue placeholder="Select update method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="polling">Polling</SelectItem>
                        <SelectItem value="webhook">Webhook</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Handle type="source" position={Position.Right} className="w-2 h-2" />
      </CardContent>
    </Card>
  );
});

LeadSourceNode.displayName = 'LeadSourceNode';
