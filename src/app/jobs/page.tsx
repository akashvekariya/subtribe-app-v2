export default function JobsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Open Positions</h1>
          <p className="text-lg text-muted-foreground">
            Discover exciting opportunities and join our team
          </p>
        </div>

        <div className="space-y-6">
          {/* Placeholder for job listings */}
          <p className="text-center text-muted-foreground py-12">
            Job listings will be displayed here. This page will be connected to
            the API to fetch and display public job postings.
          </p>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Powered by Subtribe ATS</p>
        </div>
      </div>
    </div>
  );
}
