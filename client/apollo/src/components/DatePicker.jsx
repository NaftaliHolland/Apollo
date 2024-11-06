"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

/**
 * @param formSubmited will be set to true once the form that uses the DatePicker has been submite 
 */
const DatePicker = ({date=null, setDateState}) => {
  const [selected, setSelected] = useState(date)

  useEffect(() => {
    setSelected(date);
  }, [date])

	useEffect(() => {
    try {
		  setDateState(selected?.toLocaleDateString('en-CA'));
  } catch {
    setDateState(selected);
  }
  }, [selected, setDateState]);


  return (
    <div>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-auto justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "yyyy/MM/dd") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    </div>
  )
}

export default DatePicker;
