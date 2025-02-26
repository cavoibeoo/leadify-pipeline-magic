
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { FileSpreadsheet, MoreHorizontal } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ExportNode = memo(({ data }: { data: { label: string } }) => {
  return (
    <Card className="min-w-[180px]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" />
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
                  <h4 className="font-medium leading-none">Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Configure your export settings.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="spreadsheetId">Spreadsheet ID</Label>
                    <Input
                      id="spreadsheetId"
                      className="col-span-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="sheetName">Sheet Name</Label>
                    <Input
                      id="sheetName"
                      className="col-span-2"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Handle type="target" position={Position.Left} className="w-2 h-2" />
        <Handle type="source" position={Position.Right} className="w-2 h-2" />
        <Handle type="target" position={Position.Top} className="w-2 h-2" />
        <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
      </CardContent>
    </Card>
  );
});

ExportNode.displayName = 'ExportNode';
