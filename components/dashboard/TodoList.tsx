"use client";

import React from "react";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

const TodoList = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      {/* Calender */}
      <h1 className="text-lg font-medium mb-4">Todo List</h1>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-full">
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>

      {/* List */}
      <ScrollArea className="max-h-[400px] mt-4 overflow-y-auto">
        <Card className="p-4 m-2">
          <div className="flex items-center gap-4">
            <Checkbox id="item1" />
            <label htmlFor="item1" className="text-sm text-muted-foreground">
              lorem
            </label>
          </div>
        </Card>
        <Card className="p-4 m-2">
          <div className="flex items-center gap-4">
            <Checkbox id="item1" />
            <label htmlFor="item1" className="text-sm text-muted-foreground">
              Jane
            </label>
          </div>
        </Card>
        <Card className="p-4 m-2">
          <div className="flex items-center gap-4">
            <Checkbox id="item1" />
            <label htmlFor="item1" className="text-sm text-muted-foreground">
              Musa
            </label>
          </div>
        </Card>
        <Card className="p-4 m-2">
          <div className="flex items-center gap-4">
            <Checkbox id="item1" />
            <label htmlFor="item1" className="text-sm text-muted-foreground">
              Brenda
            </label>
          </div>
        </Card>
        <Card className="p-4 m-2">
          <div className="flex items-center gap-4">
            <Checkbox id="item1" />
            <label htmlFor="item1" className="text-sm text-muted-foreground">
              Makandi
            </label>
          </div>
        </Card>
        <Card className="p-4 m-2">
          <div className="flex items-center gap-4">
            <Checkbox id="item1" />
            <label htmlFor="item1" className="text-sm text-muted-foreground">
              Regina
            </label>
          </div>
        </Card>
        <Card className="p-4 m-2">
          <div className="flex items-center gap-4">
            <Checkbox id="item1" />
            <label htmlFor="item1" className="text-sm text-muted-foreground">
              Alex Kinyua
            </label>
          </div>
        </Card>
        <Card className="p-4 m-2">
          <div className="flex items-center gap-4">
            <Checkbox id="item1" />
            <label htmlFor="item1" className="text-sm text-muted-foreground">
              Rose
            </label>
          </div>
        </Card>
        <Card className="p-4 m-2">
          <div className="flex items-center gap-4">
            <Checkbox id="item1" />
            <label htmlFor="item1" className="text-sm text-muted-foreground">
              Samuel
            </label>
          </div>
        </Card>
        <Card className="p-4 m-2">
          <div className="flex items-center gap-4">
            <Checkbox id="item1" />
            <label htmlFor="item1" className="text-sm text-muted-foreground">
              Kimenyi
            </label>
          </div>
        </Card>
      </ScrollArea>
    </div>
  );
};

export default TodoList;
