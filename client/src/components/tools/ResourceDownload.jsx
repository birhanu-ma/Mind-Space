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

    // Create a temporary link element to trigger the file download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = title;  // You can customize the filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`Downloading ${title}`);
  };
  
  return (
    <Card className="overflow-hidden">
      {image && (
        <div className="h-40 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardContent className="pt-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold text-lg">{title}</h3>
          <span className="bg-gray-100 text-xs rounded-full px-2 py-1">{fileType}</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <p className="text-xs text-gray-500">File size: {fileSize}</p>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleDownload} 
          className="w-full bg-black text-white"
          variant="outline"
        >
          <FileDown className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceDownload;
