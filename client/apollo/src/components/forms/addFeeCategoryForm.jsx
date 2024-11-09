import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

const AddFeeCategoryForm = () => {
	const [feeCategoryName, setFeeCategoryName] = useState('')
  const [feeDuration, setFeeDuration] = useState('')
  const [classAmounts, setClassAmounts] = useState({
    'Class 1': { checked: false, amount: '' },
    'Class 2': { checked: false, amount: '' },
    'Class 3': { checked: false, amount: '' },
    'Class 4': { checked: false, amount: '' },
    'Class 5': { checked: false, amount: '' },
    'Class 6': { checked: false, amount: '' },
  })

  const handleClassToggle = (className) => {
    setClassAmounts(prev => ({
      ...prev,
      [className]: { ...prev[className], checked: !prev[className].checked }
    }))
  }

  const handleAmountChange = (className, amount) => {
    setClassAmounts(prev => ({
      ...prev,
      [className]: { ...prev[className], amount }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log({ feeCategoryName, feeDuration, classAmounts })
    // Reset form or show success message
  }

  return (
		<form onSubmit={handleSubmit}>
			<CardContent className="flex flex-col gap-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="categoryName">Fee Category Name</Label>
						<Input
							id="categoryName"
							value={feeCategoryName}
							onChange={(e) => setFeeCategoryName(e.target.value)}
							placeholder="Enter fee category name"
							required
						/>
					</div>
					<div className="space-y-4">
						<Label>Apply this fees to students *</Label>
						<RadioGroup defaultValue="all" className="flex gap-4">
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="all" id="all" />
								<Label htmlFor="all">All</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="new" id="new" />
								<Label htmlFor="new">New</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="old" id="old" />
								<Label htmlFor="old">Old</Label>
							</div>
							</RadioGroup>
						</div>
					</div>
          <div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="duration">Fee Duration</Label>
							<Select value={feeDuration} onValueChange={setFeeDuration} required>
								<SelectTrigger id="duration">
									<SelectValue placeholder="Select fee duration" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="yearly">Yearly</SelectItem>
									<SelectItem value="termly">Termly</SelectItem>
									<SelectItem value="monthly">Monthly</SelectItem>
								</SelectContent>
							</Select>
						</div>
					 <div className="grid w-full gap-4">
							<Label htmlFor="message">Description</Label>
							<Textarea className="resize-none min-h-[10px]" placeholder="Type Fee description here." id="description" />
						</div> 
				</div>
				<div className="space-y-2">
					<Label>Class Amounts</Label>
					<div className="space-y-2">
						{Object.entries(classAmounts).map(([className, { checked, amount }]) => (
							<div key={className} className="flex items-center space-x-4">
								<div className="flex items-center space-x-2">
									<Checkbox
										id={className}
										checked={checked}
										onCheckedChange={() => handleClassToggle(className)}
									/>
									<Label htmlFor={className} className="w-20">{className}</Label>
								</div>
								<Input
									type="number"
									value={amount}
									onChange={(e) => handleAmountChange(className, e.target.value)}
									placeholder="Enter amount"
									disabled={!checked}
									className="w-32"
								/>
							</div>
						))}
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<Button type="submit" className="w-full">Create Fee Category</Button>
			</CardFooter>
		</form>
  )
}

export default AddFeeCategoryForm;
