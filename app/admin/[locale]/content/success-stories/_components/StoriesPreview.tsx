import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const StoriesPreview = ({ stories }: { stories: any[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Stories Preview</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-3"
          >
            <h3 className="font-semibold text-lg">{story.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {story.coupleNames}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {story.marriageDate} • {story.location}
            </p>
            <blockquote className="text-sm italic text-gray-600 dark:text-gray-400 border-l-2 border-primary-color1 pl-3">
              "{story.testimonial.substring(0, 100)}..."
            </blockquote>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
