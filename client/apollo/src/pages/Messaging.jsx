import React, { useState } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layouts/Layout";

	const recipients = [
  { id: 1, name: "All Students" },
  { id: 2, name: "All Teachers" },
  { id: 3, name: "All Parents" },
  { id: 4, name: "Grade 1" },
  { id: 5, name: "Grade 2" },
  { id: 6, name: "Grade 3" },
	]
	
	const initialMessages = [
  { id: 1, recipients: "All Students", content: "Welcome to the new school year!", status: "Sent" },
  { id: 2, recipients: "Grade 2", content: "Field trip next week", status: "Sending" },
  { id: 3, recipients: "All Parents", content: "Parent-teacher conference schedule", status: "Failed" },
	]

const Messaging = () => {

	const [messages, setMessages] = useState(initialMessages)

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
							<ScrollArea className="h-40 border rounded-md p-4">
								{recipients.map((recipient) => (
									<div key={recipient.id} className="flex items-center space-x-2 mb-2">
										<Checkbox
											id={`recipient-${recipient.id}`}
										/>
										<label
											htmlFor={`recipient-${recipient.id}`}
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											{recipient.name}
										</label>
									</div>
								))}
							</ScrollArea>
						</div>
						<div>
							<h2 className="text-lg font-semibold mb-2">Message:</h2>
							<Textarea
								placeholder="Type your message here..."
								className="min-h-[100px]"
							/>
						</div>
						<Button onClick={(e) => console.log('sent')}>Send Message</Button>
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
