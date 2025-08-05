import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { UserPlus, MessageSquare, Calendar, Star } from "lucide-react"

export default function PeerConnectPage() {
  // Placeholder data for peer matching
  const availablePeers = [
    { id: "1", name: "Alice Johnson", role: "Software Engineer", skills: ["React", "Node.js"], rating: 4.8 },
    { id: "2", name: "Bob Williams", role: "Data Analyst", skills: ["Python", "SQL", "Tableau"], rating: 4.5 },
    { id: "3", name: "Charlie Brown", role: "Product Manager", skills: ["Agile", "UX Design"], rating: 4.9 },
  ]

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">Peer Connect</h1>

        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Find a Peer for Mock Interview</CardTitle>
            <CardDescription>Connect with other job seekers for live practice sessions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="skill">Choose Skill/Domain</Label>
              <Input id="skill" placeholder="e.g., Frontend Development, Data Science" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interviewType">Interview Type</Label>
              <Select>
                <SelectTrigger id="interviewType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="behavioral">Behavioral</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="case-study">Case Study</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-medium">
              <UserPlus className="w-5 h-5 mr-2" />
              Find a Peer
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Available Peers</CardTitle>
            <CardDescription>Connect with these users for a mock interview.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availablePeers.length > 0 ? (
              availablePeers.map((peer) => (
                <div key={peer.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div>
                    <p className="font-semibold text-slate-900">{peer.name}</p>
                    <p className="text-sm text-slate-600">{peer.role}</p>
                    <p className="text-xs text-slate-500">Skills: {peer.skills.join(", ")}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500" /> {peer.rating}
                    </span>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-4 h-4 mr-1" /> Chat
                    </Button>
                    <Button size="sm">
                      <Calendar className="w-4 h-4 mr-1" /> Schedule
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-600 text-center">No peers currently available. Try adjusting your filters.</p>
            )}
            <Separator className="my-4" />
            <p className="text-sm text-slate-600 text-center">*Peer-to-peer matching is a Pro/Enterprise feature.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
