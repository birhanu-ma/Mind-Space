import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { FileDown } from 'lucide-react';
import { useToast } from '../ui/use-toast';

const ResourceDownload = ({ title, description, fileType, fileSize, image, fileUrl }) => {
  const { toast } = useToast();
  
  const handleDownload = () => {
    toast({
      title: "Download started",
      description: `${title} is being downloaded.`,
    });

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Card className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      {image && (
        <div className="h-48 w-full overflow-hidden rounded-t-2xl">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardContent className="pt-6 px-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
          <span className="bg-gray-100 text-xs font-medium rounded-full px-2 py-1 text-gray-700">{fileType}</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <p className="text-xs text-gray-500">File size: {fileSize}</p>
      </CardContent>
      
      <CardFooter className="px-6 pb-6">
        <Button 
          onClick={handleDownload} 
          className="w-full bg-black hover:bg-gray-900 text-white font-medium rounded-lg flex items-center justify-center gap-2"
        >
          <FileDown className="h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceDownload;
