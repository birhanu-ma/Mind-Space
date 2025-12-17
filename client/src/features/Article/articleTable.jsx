import React from "react";
import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card.jsx";
import { Badge } from "../../components/ui/badge.jsx";

export default function ArticleTable({ articles = [] }) {
  return (
    <div className="flex flex-col w-full bg-background px-0">
      <Card className="bg-background text-foreground border border-border rounded-xl">
        <CardContent className="overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto">
            {articles.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground">
                No articles found.
              </div>
            ) : (
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr className="border-b border-foreground/20">
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Header</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Sub-header</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Article Type</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-foreground/60">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article._id} className="border-b border-border hover:bg-muted/30 transition">
                      <td className="py-4 px-4 text-sm font-medium text-left">{article.header}</td>
                      <td className="py-4 px-4 text-sm text-left">{article.subHeader || "—"}</td>
                      <td className="py-4 px-4 text-sm text-left">
                        <Badge className={`capitalize ${article.articleType === "main" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}>
                          {article.articleType}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <NavLink
                          to={`/article-detail/${article._id}`}
                          className="text-xs font-semibold px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          View Details
                        </NavLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>

      
     
    </div>
  );
}