from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import PipelineData, PipelineResponse
from utils.graph import is_dag

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse', response_model=PipelineResponse)
def parse_pipeline(pipeline: PipelineData):
    """
    Parse pipeline and return analysis results.
    
    Args:
        pipeline: PipelineData containing nodes and edges
    
    Returns:
        PipelineResponse with num_nodes, num_edges, and is_dag
    """
    try:
        # Convert Pydantic models to dictionaries for processing
        nodes = [node.dict() for node in pipeline.nodes]
        edges = [edge.dict() for edge in pipeline.edges]
        
        # Count nodes and edges
        num_nodes = len(nodes)
        num_edges = len(edges)
        
        # Check if graph is a DAG
        is_valid_dag = is_dag(nodes, edges)
        
        return PipelineResponse(
            num_nodes=num_nodes,
            num_edges=num_edges,
            is_dag=is_valid_dag
        )
    
    except Exception as e:
        # Log error and return error response
        print(f"Error processing pipeline: {str(e)}")
        raise
