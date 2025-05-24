"use client";

import { useEffect, useState } from "react";
import { Search, Users, Loader2 } from "lucide-react";

interface User {
  id: number;
  name: string;
}

const fetchUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Alice Johnson" },
        { id: 2, name: "Bob Smith" },
        { id: 3, name: "Charlie Davis" },
        { id: 4, name: "Diana Prince" },
        { id: 5, name: "Ethan Clark" },
        { id: 6, name: "Fiona Lewis" },
        { id: 7, name: "George Hall" },
        { id: 8, name: "Hannah Adams" },
        { id: 9, name: "Ian Turner" },
        { id: 10, name: "Julia Roberts" },
      ]);
    }, 1000);
  });
};

export default function UserListing() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              User Directory
            </h1>
            <p className="text-muted-foreground">
              Search and browse through our user database
            </p>
          </div>

          <div className="relative mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search users by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {filteredUsers.length}{" "}
              {filteredUsers.length === 1 ? "user" : "users"} found
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Users className="h-12 w-12 mx-auto text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-lg font-medium">No users found</p>
                <p className="text-muted-foreground">
                  Try adjusting your search term
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="group p-6 border rounded-lg hover:border-primary/50 hover:shadow-md transition-all duration-200 bg-white cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-medium text-primary">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {user.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        ID: {user.id}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
