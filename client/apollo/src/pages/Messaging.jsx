import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layouts/Layout";
import { getClasses } from "@/Api/services";
import { sendMessage } from "@/Api/services";

	
	const initialMessages = [
  { id: 1, recipients: "All Students", content: "Welcome to the new school year!", status: "Sent" },
  { id: 2, recipients: "Grade 2", content: "Field trip next week", status: "Sending" },
  { id: 3, recipients: "All Parents", content: "Parent-teacher conference schedule", status: "Failed" },
	]

const Messaging = () => {

	const [messages, setMessages] = useState(initialMessages);
  const [classes, setClasses] = useState([]);
  const [content, setContent] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [sending, setSending] = useState(false);


  const handleRecipientToggle = (classId) => {
    setRecipients((prevState) =>
      prevState.includes(classId)
      ? prevState.filter(id => id !== classId)
      : [...prevState, classId]
    )
  }

  useEffect(() => {
    const fetchClasses = async () => {
      const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
      try {
        const response = await getClasses(schoolId);
        setClasses(response.data.classes)
      } catch (error) {
        console.log(error);
      }
    }
    // Fetch messages here
    fetchClasses();
  }, [])

  const handleSubmit = async () => {
    const schoolId = JSON.parse(localStorage.getItem("schoolInfo")).id
    try {
      setSending(true);
      const response = await sendMessage(schoolId, recipients, content);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      // Clear all fields
      setSending(false);
      setRecipients([]);
      setContent([]);
    }
  }

  return (
		<Layout>
			<div className="container mx-auto p-4 space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>Compose Message</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<h2 className="text-lg font-semibold mb-2">Select Recipients:</h2>
							<ScrollArea className="border rounded-md p-4">
								{classes.map((classItem) => (
									<div key={classItem.id} className="flex items-center space-x-2 mb-2">
										<Checkbox
											id={`recipient-${classItem.id}`}
                      checked={recipients.includes(classItem.id)}
                      onCheckedChange={() => handleRecipientToggle(classItem.id)}
										/>
										<label
											htmlFor={`recipient-${classItem.id}`}
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											{classItem.name} parents
										</label>
									</div>
								))}
							</ScrollArea>
						</div>
						<div>
							<h2 className="text-lg font-semibold mb-2">Message:</h2>
							<Textarea
                name="content"
								placeholder="Type your message here..."
								className="min-h-[100px]"
                value={content}
                onChange = {(e) => setContent(e.target.value)}
							/>
						</div>
						<Button
              onClick={handleSubmit}
              disabled={
                (!content || recipients.length === 0 || sending)
              }>{sending? "... Loading": "Send Message"}</Button>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Sent Messages</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[300px]">
							<div className="space-y-2">
								{messages.map((message) => (
									<div key={message.id} className="flex justify-between items-start p-2 border rounded-md text-sm">
										<div className="space-y-1">
											<p className="font-medium">To: {message.recipients}</p>
											<p className="text-muted-foreground line-clamp-1">{message.content}</p>
										</div>
										<span className={`text-xs px-2 py-1 rounded-full ${
											message.status === 'Sent' ? 'bg-green-100 text-green-800' :
											message.status === 'Sending' ? 'bg-yellow-100 text-yellow-800' :
											'bg-red-100 text-red-800'
										}`}>
											{message.status}
										</span>
									</div>
								))}
							</div>
						</ScrollArea>
					</CardContent>
				</Card>
			</div>
		</Layout>
  )
}

export default Messaging;
