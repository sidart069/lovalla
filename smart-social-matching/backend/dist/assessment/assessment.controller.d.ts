import { AssessmentService } from './assessment.service';
import { AssessmentDto } from './dto/assessment.dto';
export declare class AssessmentController {
    private readonly assessmentService;
    constructor(assessmentService: AssessmentService);
    submitAssessment(assessmentDto: AssessmentDto): Promise<any>;
}
